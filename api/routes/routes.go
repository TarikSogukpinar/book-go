package routes

import (
	"book-go/controllers"
	"book-go/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Root route
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("GoLang & Next.js!")
	})

	// Auth routes
	api := app.Group("/api")
	auth := api.Group("/auth")
	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)

	// Protected routes (requires authentication)
	protected := api.Group("/protected")
	protected.Use(middlewares.AuthRequired())

	// Book routes (requires authentication)
	books := api.Group("/books")
	books.Use(middlewares.AuthRequired()) // Applying Auth middleware to book routes
	books.Get("/", controllers.GetBooks)
	books.Post("/", controllers.CreateBook)
	books.Get("/:id", controllers.GetBook)
	books.Put("/:id", controllers.UpdateBook)
	books.Delete("/:id", controllers.DeleteBook)

	// Search route
	books.Get("/search", controllers.SearchBooks)
}
