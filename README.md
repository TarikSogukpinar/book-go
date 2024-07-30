
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

**Server:** Fiber, GoLang, Docker, Ubuntu

**Database:** Mongo DB

**Packages:** jwt-go, Helmet, godotenv, cors, swagger, mongo-driver, jose, faker, air, js-cookie, axios

  
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

- MONGODB_URI= example-url
- DB_NAME= example-go
- PORT=6060
- JWT_SECRET=supersecretkey

  
## Ekran Görüntüleri

![Uygulama Ekran Görüntüsü](https://i.ibb.co/n3yTQvm/Ekran-g-r-nt-s-2024-07-30-085603.png)

  
