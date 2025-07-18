Aaram - MERN E-commerce Platform
Aaram is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a complete shopping experience, from browsing products to placing orders, with a clean user interface and a robust backend.

Features
Full-featured shopping cart: Add, remove, and update item quantities.

Product reviews and ratings: (Future implementation)

Top products carousel: (Future implementation)

Product pagination: (Future implementation)

User authentication: Secure sign-up and login with JSON Web Tokens (JWT).

Customer profiles: Users can view and update their personal information.

Complete checkout process: Shipping, payment method selection, and order summary.

Admin panel: (Future implementation for product, user, and order management).

Database seeder: Script to easily populate the database with sample users and products.

Technology Stack
Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for Node.js.

MongoDB: NoSQL database for storing data.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

JSON Web Tokens (JWT): For secure user authentication.

bcryptjs: For hashing user passwords.

Frontend
React: JavaScript library for building user interfaces.

Redux Toolkit: For efficient and predictable state management.

React Bootstrap: UI component library for a responsive design.

Axios: For making HTTP requests to the backend API.

Vite: Modern frontend build tool.

Environment Variables
Create a .env file in the /server root directory and add the following variables:

NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

MONGO_URI: Your connection string for your MongoDB database (local or cloud).

JWT_SECRET: A long, random string used to sign authentication tokens.

Local Development Setup
Prerequisites
Node.js and npm

MongoDB (or a MongoDB Atlas account)

Installation & Setup
Clone the repository:

git clone <your-repository-url>
cd <repository-name>

Setup Backend:

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create the .env file with your variables (as shown above)

Setup Frontend:

# Navigate to the client directory from the root
cd client

# Install dependencies
npm install

Running the Application
Seed the Database (Optional but Recommended):
From the /server directory, run the following command to populate the database with sample data. This will create an admin user (admin@example.com / password123) and several products.

# Make sure you are in the /server directory
npm run data:import

To clear the database, you can run:

npm run data:destroy

Start the Servers:
You need to run two terminals simultaneously.

Terminal 1 (Backend): Navigate to the /server directory.

npm run server

The backend will be running on http://localhost:5000.

Terminal 2 (Frontend): Navigate to the /client directory.

npm run dev

The frontend will be running on http://localhost:5173 (or another available port).

Open your browser and 
