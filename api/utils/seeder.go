package utils

import (
	"context"
	"time"

	"book-go/database"

	"github.com/bxcodec/faker/v3"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Book struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title       string             `bson:"title" json:"title" validate:"required,min=2,max=100"`
	Author      string             `bson:"author" json:"author" validate:"required,min=2,max=100"`
	Description string             `bson:"description" json:"description" validate:"required,min=2,max=1000"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}

func SeedBooks(count int) error {
	var books []interface{}
	for i := 0; i < count; i++ {
		book := Book{
			ID:          primitive.NewObjectID(),
			Title:       faker.Word(),
			Author:      faker.Name(),
			Description: faker.Paragraph(),
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		}
		books = append(books, book)
	}

	_, err := database.BookCollection.InsertMany(context.TODO(), books)
	if err != nil {
		return err
	}

	return nil
}
