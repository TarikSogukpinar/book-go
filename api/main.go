package main

import (
	"book-go/database"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	// .env dosyasını yükle
	app := fiber.New()

	app.Use(logger.New())

	// MongoDB bağlantısını oluştur
	database.Connect()
	defer database.Disconnect()

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// PORT çevresel değişkenini al
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Varsayılan port
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	log.Fatal(app.Listen(":" + port))
}
