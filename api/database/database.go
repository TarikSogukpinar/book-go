package database

import (
	"book-go/config"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var UserCollection *mongo.Collection
var BookCollection *mongo.Collection

type MongoInstance struct {
	Client *mongo.Client
	Db     *mongo.Database
}

var Mg MongoInstance

func Connect() error {

	config.LoadConfig()

	mongoURI := config.Get("MONGODB_URI")
	dbName := config.Get("DB_NAME")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))

	if err != nil {
		return err
	}

	// Ping the database to verify connection
	if err := client.Ping(context.TODO(), nil); err != nil {
		return err
	}

	db := client.Database(dbName)

	Mg = MongoInstance{
		Client: client,
		Db:     db,
	}

	UserCollection = db.Collection("users")
	BookCollection = db.Collection("books")

	fmt.Println("Connected to MongoDB!")
	return nil
}
