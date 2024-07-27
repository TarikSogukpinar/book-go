package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Username string             `bson:"username" json:"username" validate:"required,min=3,max=64"`
	Password string             `bson:"password" json:"password" validate:"required,min=6"`
}
