Furniture E-commerce Application

Overview

This project is a single-page e-commerce application for a furniture store, featuring essential functionalities such as user authentication, product listing, and cart management. It is designed to provide a seamless user experience with a clean and professional interface.
________________________________________
Features
1.	User Authentication:
o	Secure Signup and Login functionality with form validation.
o	JWT-based authentication for secure access.
2.	Product Listing:
o	Displays products dynamically fetched from the database.
o	Responsive grid layout with hover animations for product cards.
3.	Cart Management:
o	Add and remove products from the cart.
o	Dynamically updates the cart count in real-time.
________________________________________
Tech Stack
•	Frontend: React.js, Material-UI
•	Backend: Node.js, Express.js
•	Database: PostgreSQL
•	Authentication: JWT (JSON Web Tokens)
________________________________________
Prerequisites
•	Node.js (version 14+)
•	PostgreSQL (version 12+)
________________________________________
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/nethragovinda/furniture-ecommerce.git
cd furniture-ecommerce
________________________________________
2. Frontend Setup
1.	Navigate to the frontend folder:
bash
Copy code
cd frontend
2.	Install dependencies:
bash
Copy code
npm install
3.	Start the development server:
bash
Copy code
npm start
4.	The frontend will run at http://localhost:3000.
________________________________________
3. Backend Setup
1.	Navigate to the backend folder:
bash
Copy code
cd backend
2.	Install dependencies:
bash
Copy code
npm install
3.	Create a .env file in the backend folder with the following variables:
env
Copy code
DATABASE_URL=postgresql://postgresql:test@localhost:5432/ecommerce
JWT_SECRET=your_secret_key
PORT=5000
4.	Set up the database:
o	Open your PostgreSQL shell and create the database:
sql
Copy code
CREATE DATABASE ecommerce;
o	Run the provided SQL file (backend/database/schema.sql) to create tables:
bash
Copy code
psql -U postgresql -d ecommerce -f backend/database/schema.sql
o	Optionally, seed the database with initial data:
bash
Copy code
psql -U postgresql -d ecommerce -f backend/database/seed.sql
5.	Start the backend server:
bash
Copy code
npm run dev
6.	The backend will run at http://localhost:5000.
________________________________________
4. Testing the Application
1.	Open your browser and navigate to:
o	Frontend: http://localhost:3000
o	Backend API (Optional): Test endpoints using Postman.
2.	Use the app to:
o	Register a new user.
o	Log in with your credentials.
o	Browse the product listing.
o	Add/remove items from the cart.
________________________________________
Project Structure
Frontend
•	/src/components: Reusable UI components.
•	/src/pages: Full-page components like Login, Signup, Products, and Cart.
•	/src/api: API integration for backend communication.
Backend
•	/routes: API route definitions.
•	/controllers: Route logic and business logic.
•	/db: Database configuration and queries.
•	/middleware: Middleware for authentication and validation.
________________________________________
Environment Variables
Variable	Description
DATABASE_URL	PostgreSQL connection string
JWT_SECRET	Secret key for JWT token generation
PORT	Port on which the backend server will run
________________________________________
Troubleshooting
1.	Frontend Issues:
o	If the frontend doesn’t load, ensure the backend server is running.
o	Check for any errors in the browser console.
2.	Database Issues:
o	Verify that PostgreSQL is running.
o	Check the database connection string in the .env file.
________________________________________
Contact
For any questions or additional details, please feel free to contact me:
•	Name: Nethra Govinda
•	Email: nethragovinda@gmail.com

