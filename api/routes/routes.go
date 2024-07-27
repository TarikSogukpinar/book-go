package routes

import (
	"book-go/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Root route
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// Auth routes
	api := app.Group("/api")
	auth := api.Group("/auth")
	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)

	// Protected routes
	protected := api.Group("/protected")
	protected.Use(controllers.AuthRequired())
	protected.Get("/", controllers.Protected)

	// Book routes
	books := api.Group("/books")
	books.Use(controllers.AuthRequired())
	books.Get("/", controllers.GetBooks)
	books.Post("/", controllers.CreateBook)
	books.Get("/:id", controllers.GetBook)
	books.Put("/:id", controllers.UpdateBook)
	books.Delete("/:id", controllers.DeleteBook)
}
