package validators

import (
	"errors"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func ValidateStruct(data interface{}) error {
	err := validate.Struct(data)
	if err != nil {
		var errorMsgs []string
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "required":
				errorMsgs = append(errorMsgs, err.Field()+" is required")
			case "min":
				errorMsgs = append(errorMsgs, err.Field()+" must be at least "+err.Param()+" characters long")
			case "max":
				errorMsgs = append(errorMsgs, err.Field()+" must be at most "+err.Param()+" characters long")
			}
		}
		return errors.New(strings.Join(errorMsgs, ", "))
	}
	return nil
}
