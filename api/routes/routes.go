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
}
