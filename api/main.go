package main

import (
	"context"
	"log"
	"os"

	"book-go/config"
	"book-go/database"
	_ "book-go/docs" // Swagger dosyalarını import edin
	"book-go/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

// @title BOOK-GO Swagger Example API
// @version 1.0
// @description This is a sample server for a Fiber application.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:3000
// @BasePath /

func main() {
	// .env dosyasını yükle
	config.LoadConfig()

	// MongoDB bağlantısını oluştur
	if err := database.Connect(); err != nil {
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

	app.Static("/docs", "./docs")

	// Swagger rotasını ekle
	app.Get("/swagger/*", swagger.New(swagger.Config{
		URL: "http://localhost:5000/docs/swagger.json", // Swagger dokümanının URL'si
	}))

	// Rotaları ayarla
	routes.SetupRoutes(app)

	// PORT çevresel değişkenini al
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Varsayılan port
	}

	// Uygulamayı başlat
	log.Fatal(app.Listen(":" + port))
}
