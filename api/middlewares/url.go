package middlewares

import (
	"net/url"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// URLCleanupMiddleware temizleme ve normalize işlemlerini yapar
func URLCleanupMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Orijinal URL'yi alın
		originalURL := c.OriginalURL()

		// URL'yi parse edin
		u, err := url.Parse(originalURL)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("URL parsing error")
		}

		// Path, RawQuery ve Fragment alanlarını sıfırlayın
		cleanURL := strings.ToLower(u.Path)
		cleanURL = strings.TrimSuffix(cleanURL, "/")
		u.Path = cleanURL
		u.RawQuery = ""
		u.Fragment = ""

		// Eğer URL değiştiyse, URL'yi güncelle
		if cleanURL != originalURL {
			c.Path(u.Path)
		}

		// İşleme devam edin
		return c.Next()
	}
}
