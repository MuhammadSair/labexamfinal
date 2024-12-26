# Library Management System

This project implements a Library Management System using **Node.js**, **Express**, and **MongoDB**. The system manages **Books**, **Authors**, and **Borrowers**, and includes constraints to simulate real-world library functionality, such as borrowing limits and author-book relationships.

---

## Features

### Book Management

- CRUD operations for books.
- Borrowing and returning books.
- Tracks the number of available copies and borrowing frequency.
- Enforces constraints:
  - A book's `available_copies` cannot exceed 100 if it has been borrowed more than 10 times.

### Author Management

- CRUD operations for authors.
- Enforces a maximum limit of 5 books per author.
- Provides a route to list authors who have reached this limit.

### Borrower Management

- CRUD operations for borrowers.
- Enforces borrowing limits based on membership type:
  - **Standard Members**: Maximum 5 books.
  - **Premium Members**: Maximum 10 books.
- Prevents borrowing if the borrower has overdue books or inactive membership.

---

## Installation

### Prerequisites

- Node.js and npm
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB locally or use a MongoDB Atlas cluster.
4. Update the MongoDB connection string in `server.js`:
   ```javascript
   mongoose.connect("mongodb://localhost:27017/library", {
     useNewUrlParser: true,
   });
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. The server will run on `http://localhost:3000`.

---

## Endpoints

### Book Endpoints

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/books`        | Create a new book      |
| GET    | `/api/books`        | Get all books          |
| GET    | `/api/books/:id`    | Get a book by ID       |
| PUT    | `/api/books/:id`    | Update a book          |
| DELETE | `/api/books/:id`    | Delete a book          |
| POST   | `/api/books/borrow` | Borrow a book          |
| POST   | `/api/books/return` | Return a borrowed book |

### Author Endpoints

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/authors`       | Create a new author       |
| GET    | `/api/authors`       | Get all authors           |
| GET    | `/api/authors/limit` | List authors with 5 books |
| PUT    | `/api/authors/:id`   | Update an author          |
| DELETE | `/api/authors/:id`   | Delete an author          |

### Borrower Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/borrowers`     | Create a new borrower |
| GET    | `/api/borrowers`     | Get all borrowers     |
| PUT    | `/api/borrowers/:id` | Update a borrower     |
| DELETE | `/api/borrowers/:id` | Delete a borrower     |

---

### Testing

I have provided the collection of postman that fulfill All test cases Effeciently providing an
easy demonstration
