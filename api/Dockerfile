# Builder aşaması
FROM golang:1.22.5 AS builder

# Çalışma dizinimizi oluşturuyoruz
WORKDIR /app

# Go mod ve sum dosyalarını çalışma dizinimize kopyalıyoruz
COPY go.mod go.sum ./

# Modülleri indiriyoruz
RUN go mod download

# Uygulama dosyalarını kopyalıyoruz
COPY . .

# .env dosyasını kopyalıyoruz
COPY .env .env

# Uygulamayı build ediyoruz
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Son aşamada çalıştırmak için ufak bir image kullanıyoruz
FROM alpine:latest

WORKDIR /root/

# Builder aşamasında üretilen binary dosyamızı kopyalıyoruz
COPY --from=builder /app/main .
COPY --from=builder /app/.env .

# Binary dosyamızı çalıştırılabilir hale getiriyoruz
RUN chmod +x ./main

# Uygulamamızı başlatıyoruz
CMD ["./main"]
