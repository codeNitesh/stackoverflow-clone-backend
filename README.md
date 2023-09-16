# Stack Overflow Application

Welcome to the README for Stack Overflow backend application. This server-side component provides various API routes for managing data, including questions, answers, user authentication, tags, and more.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Routes](#routes)
   - [Authentication Routes](#authentication-routes)
   - [Question Routes](#question-routes)
   - [Answer Routes](#answer-routes)
   - [Search Routes](#search-routes)
   - [Tag Routes](#tag-routes)
3. [Usage](#usage)
4. [Authentication](#authentication)
5. [Contributing](#contributing)
6. [License](#license)

## Getting Started

To begin using this backend application, make sure you have Node.js and npm (Node Package Manager) installed. Follow these steps:

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/codeNitesh/stackoverflow-clone-backend
   ```

2. Navigate to the project directory:

   ```sh
   cd stackoverflow-clone-backend
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```
   
4. Setup Database:
   ```sh
   UPDATE MONGODB_URI in config file
   ```
   
5. Start the server:

   ```sh
   npm start
   ```

The server should now be running on a specific port (e.g., http://localhost:3000).

## Routes

This application provides a range of API routes for different functionalities. Below is an overview of the available routes:

### Authentication Routes

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user and generate an API token.

### Question Routes

- **POST /**: Create a new question.
- **GET /**: Retrieve all questions.
- **GET /:id**: Get a single question by ID.
- **PUT /:id**: Update a question by ID.
- **DELETE /:id**: Delete a question by ID.

### Answer Routes

- **POST /**: Create a new answer for a question.
- **GET /question/:questionId**: Retrieve all answers for a specific question.
- **GET /:id**: Get a single answer by ID.
- **PUT /:id**: Update an answer by ID.
- **DELETE /:id**: Delete an answer by ID.
- **PUT /:id/accept**: Mark an answer as accepted.

### Search Routes

- **GET /**: Search for questions using keywords.

### Tag Routes

- **POST /**: Create a new tag.
- **GET /**: Retrieve all tags.
- **GET /:id**: Get a single tag by ID.
- **PUT /:id**: Update a tag by ID.
- **DELETE /:id**: Delete a tag by ID.

## Usage

To utilize the API endpoints provided by this backend application, can make HTTP requests using tools like Postman or integrate them into the frontend application.

Please ensure to handle authentication correctly when accessing protected routes. (Passing Auth Token)

## Authentication

This application employs JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the `Authorization` header of HTTP requests.

## Contributing

TODO

## License

TODO
