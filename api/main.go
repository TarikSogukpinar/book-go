package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"book-go/database"
	"book-go/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	// .env dosyasını yükle
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// MongoDB bağlantısını oluştur
	if err := database.Connect(); err != nil {
		fmt.Println("Could not connect to MongoDB")
		log.Fatal(err)
	}
	defer func() {
		if err := database.Mg.Client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Fiber uygulamasını başlat
	app := fiber.New()

	// Logger middleware ekle
	app.Use(logger.New())

	// Rotaları ayarla
	routes.SetupRoutes(app)

	// PORT çevresel değişkenini al
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000" // Varsayılan port
	}

	// Uygulamayı başlat
	log.Fatal(app.Listen(":" + port))
}
