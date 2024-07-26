package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func GetBooks(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All books",
		"data":    nil, // Buraya kitap verilerini ekleyeceksiniz
	})
}

func GetBook(c *fiber.Ctx) error {
	id := c.Params("id")
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Single book",
		"data":    id, // Buraya spesifik kitap verisini ekleyeceksiniz
	})
}

func CreateBook(c *fiber.Ctx) error {
	// Kitap oluşturma kodu buraya gelecek
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Book created",
		"data":    nil, // Buraya oluşturulan kitap verisini ekleyeceksiniz
	})
}

func UpdateBook(c *fiber.Ctx) error {
	id := c.Params("id")
	// Kitap güncelleme kodu buraya gelecek
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Book updated",
		"data":    id, // Buraya güncellenen kitap verisini ekleyeceksiniz
	})
}

func DeleteBook(c *fiber.Ctx) error {
	id := c.Params("id")
	// Kitap silme kodu buraya gelecek
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Book deleted",
		"data":    id, // Buraya silinen kitap verisini ekleyeceksiniz
	})
}
