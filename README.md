# Blogging Platform

A full-stack blogging platform built with Node.js, Express, MongoDB, and React with Redux Toolkit. Users can sign up, log in, create, edit, and delete blog posts, as well as add comments to blog posts. The platform supports user authentication with JWT which is store into cookies.For Frontend UI i am using Basic CSS and UI framework like bootstrap.

## Features

### Backend (Node.js)
- User authentication with JWT
- CRUD operations for blog posts
- Adding comments to blog posts
- Authorization middleware to protect routes and ErrorHandling middleware for managing error in througout this application.
- also use cors middleware for handling cors error and by default i set localhost origin like "http://localhost:5173". so we can set some boolean condition for handling origin in local and production mode.
- JWT token validation is like 1 hour.

### Frontend (React with Redux Toolkit)
- User authentication (sign up, log in, log out)
- Creating, viewing, editing, and deleting blog posts
- Viewing and adding comments to blog posts
- Responsive and user-friendly UI
- Sorting blog post according to the date and author.
- use Redux toolkit for managing state and api call througout this application.
- also use redux-persist for storing some store data into localstorage for handaling login activity after refreshing the page.
- In this project i am used vite for creating react project

## Prerequisites

- Node.js (v14 or higher) but i am using Node v20.  
- MongoDB (MongoDB Atlas or local MongoDB instance) but in this project i am using MongoDB Atlas cloud database.

## Setup Instructions

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd blogging-platform/backend

2. **Install Dependencies:**
   npm install

3. **Set up Environment Variables:**
   Create a .env file in the backend directory and add the following environment variables:
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ehrvtyz.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_jwt_secret
   **NOTE:** Make sure to replace placeholder values like `<username>`, `<password>`, and `<dbname>` with the actual values for your project and in JWT_SECRET you can placed any random string. just like below example

   JWT_SECRET=2b7e151628aed2a6abf7158809cf4f3c762e7160a75b72d198d7f2ff9355ddc1

   you can genarate your own random string using Node Js REPL environment and run this below logic.

   require('crypto').randomBytes(64).toString('hex'); 

   if you want to use local mongodb instance then you can use this
   MONGO_URI=mongodb://localhost:27017/<dbname>

4. **Start the Backend Server:**
   npm run dev
   **NOTE:** The backend server will run on http://localhost:5000

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   cd ../frontend

2. **Install Dependencies:**
   npm install

3. **Set up Environment Variables:**
   Create a .env file in the frontend directory and add the following environment variables:
   
   VITE_API_URL=http://localhost:5000

4. **Start the Frontend Server:**
   npm run dev

   **NOTE:** The frontend server will run on http://localhost:5173


### API Endpoints

1. **Authentication**
   POST /auth/register: Register a new user
   POST /auth/login: Log in a user
   POST /auth/logout: Log out the current user

2. **Blog Posts**
   GET /posts: Get all blog posts (protected)
   POST /posts: Create a new blog post (protected)
   GET /posts/:id: Get a single blog post by ID (protected)
   PUT /posts/:id: Update a blog post by ID (protected)
   DELETE /posts/:id: Delete a blog post by ID (protected)

3. **Comments**
   POST /comments: Add a new comment to a blog post (protected)





