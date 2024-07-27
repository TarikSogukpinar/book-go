package controllers

import (
	"context"
	"go-fiber-jwt-auth/models"
	"go-fiber-jwt-auth/services"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func Register(userCollection *mongo.Collection) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var user models.User
		if err := c.BodyParser(&user); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "Invalid payload",
			})
		}

		if err := services.RegisterUser(context.Background(), userCollection, &user); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":  "error",
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":  "success",
			"message": "User registered successfully",
		})
	}
}

func Login(userCollection *mongo.Collection) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var credentials models.User
		if err := c.BodyParser(&credentials); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"status":  "error",
				"message": "Invalid payload",
			})
		}

		token, err := services.AuthenticateUser(context.Background(), userCollection, &credentials)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "error",
				"message": err.Error(),
			})
		}

		return c.JSON(fiber.Map{
			"status": "success",
			"token":  token,
		})
	}
}
