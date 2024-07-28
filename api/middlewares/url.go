package middlewares

import (
	"net/url"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func URLCleanupMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		originalURL := c.OriginalURL()

		u, err := url.Parse(originalURL)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("URL parsing error")
		}

		cleanURL := strings.ToLower(u.Path)
		cleanURL = strings.TrimSuffix(cleanURL, "/")
		u.Path = cleanURL
		u.RawQuery = ""
		u.Fragment = ""

		if cleanURL != originalURL {
			c.Path(u.Path)
		}

		return c.Next()
	}
}
