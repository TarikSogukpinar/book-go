package controllers

import (
	"book-go/database"
	"book-go/models"
	"book-go/validators"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetBooks godoc
// @Summary Get all books
// @Description Retrieve all books with pagination
// @Tags books
// @Produce json
// @Param page query int false "Page number"
// @Param limit query int false "Number of books per page"
// @Success 200 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/books [get]
func GetBooks(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page < 1 {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid page number",
		})
	}

	limit, err := strconv.Atoi(c.Query("limit", "10"))
	if err != nil || limit < 1 {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid limit number",
		})
	}

	skip := int64((page - 1) * limit)
	limit64 := int64(limit)

	// Find all books with pagination
	cursor, err := database.BookCollection.Find(context.Background(), bson.D{}, &options.FindOptions{
		Skip:  &skip,
		Limit: &limit64,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not retrieve books",
		})
	}
	defer cursor.Close(context.Background())

	books := []models.Book{}
	for cursor.Next(context.Background()) {
		var book models.Book
		if err := cursor.Decode(&book); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
				"status":  "error",
				"message": "Could not decode book",
			})
		}
		books = append(books, book)
	}

	// Count total books
	total, err := database.BookCollection.CountDocuments(context.Background(), bson.D{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not count books",
		})
	}

	return c.JSON(map[string]interface{}{
		"books": books,
		"total": total,
		"page":  page,
		"limit": limit,
	})
}

// GetBook godoc
// @Summary Get a book by ID
// @Description Retrieve a book by its ID
// @Tags books
// @Produce json
// @Param id path string true "Book ID"
// @Success 200 {object} models.Book
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /api/books/{id} [get]
func GetBook(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid book ID",
		})
	}

	var book models.Book
	err = database.BookCollection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&book)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Book not found",
		})
	}

	return c.JSON(book)
}

// CreateBook godoc
// @Summary Create a new book
// @Description Add a new book
// @Tags books
// @Accept json
// @Produce json
// @Param book body models.Book true "Book"
// @Success 201 {object} models.Book
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/books [post]
func CreateBook(c *fiber.Ctx) error {
	var book models.Book
	if err := c.BodyParser(&book); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid request payload",
		})
	}

	// Validation
	if err := validators.ValidateStruct(book); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": err.Error(),
		})
	}

	book.ID = primitive.NewObjectID()
	book.CreatedAt = time.Now()
	book.UpdatedAt = time.Now()

	_, err := database.BookCollection.InsertOne(context.Background(), book)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not create book",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(book)
}

// UpdateBook godoc
// @Summary Update a book
// @Description Update a book by its ID
// @Tags books
// @Accept json
// @Produce json
// @Param id path string true "Book ID"
// @Param book body models.Book true "Book"
// @Success 200 {object} models.Book
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/books/{id} [put]
func UpdateBook(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid book ID",
		})
	}

	var book models.Book
	if err := c.BodyParser(&book); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid request payload",
		})
	}

	// Validation
	if err := validators.ValidateStruct(book); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": err.Error(),
		})
	}

	book.UpdatedAt = time.Now()

	update := bson.M{
		"$set": book,
	}

	_, err = database.BookCollection.UpdateOne(context.Background(), bson.M{"_id": objID}, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not update book",
		})
	}

	return c.JSON(book)
}

// DeleteBook godoc
// @Summary Delete a book
// @Description Delete a book by its ID
// @Tags books
// @Param id path string true "Book ID"
// @Success 204
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/books/{id} [delete]
func DeleteBook(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Invalid book ID",
		})
	}

	_, err = database.BookCollection.DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not delete book",
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

// SearchBooks godoc
// @Summary Search books
// @Description Search books by title
// @Tags books
// @Produce json
// @Param q query string true "Search query"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/books/search [get]
func SearchBooks(c *fiber.Ctx) error {
	query := c.Query("q")
	if len(query) < 2 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Query parameter must be at least 2 characters long",
		})
	}

	log.Printf("Search query: %s", query)

	filter := bson.M{
		"$or": []bson.M{
			{"title": bson.M{"$regex": query, "$options": "i"}},
			{"author": bson.M{"$regex": query, "$options": "i"}},
		},
	}

	var books []models.Book
	collection := database.BookCollection
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to search books",
		})
	}
	defer cursor.Close(context.Background())

	if err := cursor.All(context.Background(), &books); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to parse books",
		})
	}

	return c.JSON(fiber.Map{
		"books": books,
	})
}
