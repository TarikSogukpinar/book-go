package main

import (
	"context"
	"flag"
	"log"
	"os"
	"time"

	"book-go/config"
	"book-go/database"
	_ "book-go/docs"
	"book-go/middlewares"
	"book-go/routes"
	"book-go/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/limiter"
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

	seed := flag.Bool("seed", false, "seed the database with fake data")
	flag.Parse()

	config.LoadConfig()

	if err := database.Connect(); err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := database.Mg.Client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// If the seed flag is set, seed the database and exit
	if *seed {
		err := utils.SeedBooks(500)
		if err != nil {
			log.Fatalf("Error adding fake books: %v", err)
		}
		log.Println("Fake books added successfully!")
		return
	}

	logFile, err := os.OpenFile("server.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer logFile.Close()

	app := fiber.New()

	app.Use(limiter.New(limiter.Config{
		Max:        100,
		Expiration: 30 * time.Second,
	}))

	app.Use(helmet.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "https://book.tariksogukpinar.dev, http://localhost:3000, http://localhost:6060, http://localhost:7070",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	app.Use(logger.New(logger.Config{
		Format:     "[${time}] ${status} - ${method} ${path}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "Local",
	}))

	app.Use(middlewares.URLCleanupMiddleware())

	app.Static("/docs", "./docs")

	app.Get("/swagger/*", swagger.New(swagger.Config{
		URL: "http://localhost:6060/docs/swagger.json", // Swagger URL
	}))

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "6060" // Default port
	}

	log.Fatal(app.Listen(":" + port))
}
