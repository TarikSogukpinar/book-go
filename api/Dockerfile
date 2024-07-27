# Stage 1: Build the Go Fiber application
FROM golang:1.22.5 AS builder

WORKDIR /app

# Go mod files first to cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire application
COPY . .

# Build the application
RUN go build -o main .

# Stage 2: Create the final image
FROM alpine:latest

WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Expose the application's port
EXPOSE 5000

# Command to run the application
CMD ["./main"]