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
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	// Log dosyasını oluştur
	logFile, err := os.OpenFile("server.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer logFile.Close()

	// Fiber uygulamasını başlat
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	// Logger middleware ekle
	app.Use(logger.New(logger.Config{
		Format:     "[${time}] ${status} - ${method} ${path}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "Local",
	}))

	app.Static("/docs", "./docs")

	// Swagger rotasını ekle
	app.Get("/swagger/*", swagger.New(swagger.Config{
		URL: "http://localhost:6060/docs/swagger.json", // Swagger dokümanının URL'si
	}))

	// Rotaları ayarla
	routes.SetupRoutes(app)

	// PORT çevresel değişkenini al
	port := os.Getenv("PORT")
	if port == "" {
		port = "6060" // Varsayılan port
	}

	// Uygulamayı başlat
	log.Fatal(app.Listen(":" + port))
}
