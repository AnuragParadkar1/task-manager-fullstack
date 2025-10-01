# Task Manager - Full-Stack Application
### A comprehensive task management application built with a modern tech stack. This project features a robust backend API using Node.js and Express, connected to a PostgreSQL database, and a dynamic, responsive frontend built with React and Vite.

## ✨ Features
### User Authentication: Secure user registration and login functionality.

### Task Management: Full CRUD (Create, Read, Update, Delete) operations for tasks.

### RESTful API: A well-structured backend API for handling all application logic.

### Responsive Design: A clean, modern user interface built with Tailwind CSS that works on all devices.

### Database Integration: Uses Sequelize ORM for elegant and safe database interactions.

### Containerized Database: The PostgreSQL database runs in a Docker container for easy setup and consistency.

## 🛠️ Tech Stack
### Backend: Node.js, Express.js, Sequelize, JSON Web Tokens (JWT)

### Frontend: React, Vite, Tailwind CSS, React Router

### Database: PostgreSQL (run via Docker)

### Development: Nodemon for backend hot-reloading

## 🚀 Getting Started
### Follow these instructions to get the project up and running on your local machine.

Prerequisites
### Node.js (v18 or later recommended)

### Docker Desktop

### Git

### Installation & Setup
### Clone the repository:

### git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
### cd your-repo-name

## Backend Setup:

### Navigate to the backend folder
cd backend

### Install dependencies
npm install

### Create the .env file (copy from .env.example) and add your DATABASE_URL and password

### cp .env.example .env

### Start the database (make sure Docker is running)
docker run --name postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=task -p 5432:5432 -d -v postgres_data:/var/lib/postgresql/data postgres

### Start the backend server
npm run dev

The backend will be running on http://localhost:5000.

Frontend Setup:

### Open a new terminal and navigate to the frontend folder
cd frontend

### Install dependencies
npm install

### Start the frontend development server
npm run dev

### The frontend will be running on http://localhost:3000.

## ⚙️ Environment Variables
The backend requires a .env file in the /backend directory with the following variables:

### The connection string for your PostgreSQL database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/task"

### The port the backend server will run on
PORT=5000

### The current environment ('development' or 'production')
NODE_ENV="development"
