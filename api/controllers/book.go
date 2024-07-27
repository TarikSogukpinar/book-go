package controllers

import (
	"book-go/database"
	"book-go/models"
	"book-go/validators"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetBooks godoc
// @Summary Get all books
// @Description Retrieve all books
// @Tags books
// @Produce json
// @Success 200 {array} models.Book
// @Failure 500 {object} map[string]interface{}
// @Router /api/books [get]
func GetBooks(c *fiber.Ctx) error {
	books := []models.Book{}

	cursor, err := database.BookCollection.Find(context.Background(), bson.D{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status":  "error",
			"message": "Could not retrieve books",
		})
	}
	defer cursor.Close(context.Background())

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

	return c.JSON(books)
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
