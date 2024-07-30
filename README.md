
![Logo](https://repository-images.githubusercontent.com/361875137/f9e5ad80-a785-11eb-9d38-a8b8fd7809ff)

    
# GoLang & Next.js Book CRUD API


## API Usage

- Auth API

#### Login

```https
  __POST__ /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. The email of the user |
| `password`      | `string` | **Required**. The password of the user |

#### Register

```https
  __POST__ /api/auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. The username of the user |
| `email`      | `string` | **Required**. The email of the user |
| `password`      | `string` | **Required**. The password of the user |


- Books API


```https
  __GET__ /api/books
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `integer` | **Required**. Page number |




```https
  __POST__  /api/books
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `book`      | `object` | **Required**. Book details |




```https
  __GET__ /api/books/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `q`      | `string` | **Required**. Search query |


```https
  __GET__ /api/books/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Book ID |
| `book`      | `object` | **Required**. Book details |


```https
  __DELETE__ /api/books/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Book ID |











##
  
**Client:** Next.js, Tailwind CSS, Typescript

**Server:** Fiber, GoLang, Docker

**Database:** Mongo DB

**Packages:** Jsonwebtoken, Helmet, godotenv, cors, swagger, mongo-driver, jose, faker, air

  
# Demo

https://book.tariksogukpinar.dev/

  
# Installation

Clone Project

```bash
git clone https://github.com/TarikSogukpinar/book-go
```

go project folder /api & or /web

```bash
  cd api & web
```

install go & next.js

```bash
  go install & npm install
```


run projects

```bash
  air & npm run dev
```

  

  
# Enviroment variables

- NODE_ENV=development or production or staging
- DATABASE_URL= your_database_url
- API_PORT = 5000
- JWT_SECRET = secret
- JWT_EXPIRES_IN = 1d
- JWT_REFRESH_SECRET = secret
- JWT_REFRESH_EXPIRES_IN = 7d
- GOOGLE_CLIENT_ID= your_google_client_id
- GOOGLE_CLIENT_SECRET= your_google_secret_client_id
- GITHUB_CLIENT_ID= your_github_client_id
- GITHUB_CLIENT_SECRET= your_github_client_secret
- API_GLOBAL_PREFIX = /api

  
