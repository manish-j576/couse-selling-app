📚 Course Selling App

A simple and modular course selling platform built using Node.js, Express, MongoDB, and JWT authentication.
This project includes user and admin authentication, course management, and basic purchasing features.

🚀 Features Implemented So Far
👤 User Features

User Signup

User Login

Purchase a Course

View Available Courses

🛠️ Admin Features

Admin Signup

Admin Login

Create a Course

Delete a Course

Add Course Content

🔐 Authentication

JWT-based User Authentication

JWT-based Admin Authentication

Protected Routes handled through auth middleware

🗄️ Database

MongoDB (Mongoose)

.env for managing database connection string and JWT secrets

📦 Schemas Defined

User

Admin

Course

Purchase

📁 Project Structure (Recommended)
project/
│── controllers/
│── middleware/
│── models/
│── routes/
│── index.js
│── .env
│── package.json
│── README.md

🛠️ Technologies Used

Node.js

Express.js

MongoDB + Mongoose

jsonwebtoken (JWT)

dotenv

📜 How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Add your .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

3️⃣ Start the server
npm start

🔐 Authentication Flow
User Flow

Signup → Save user → Return token

Login → Verify credentials → Return token

Access protected routes → Provide Bearer <token>

Admin Flow

Same as user flow, with admin-only routes.

📚 Available API Endpoints (Current)
👤 User Routes
Method	Route	Description
POST	/user/signup	Create a new user
POST	/user/login	Login and get token
GET	/user/courses	View all courses
POST	/user/purchase/:courseId	Purchase a course
🛠️ Admin Routes
Method	Route	Description
POST	/admin/signup	Create new admin
POST	/admin/login	Login as admin
POST	/admin/course	Create a course
DELETE	/admin/course/:id	Delete a course
PUT	/admin/course/:id/content	Add course content
🧪 Extra (Optional Enhancements)

You can later add:

Frontend using React

Roles & permissions

Course search + filtering

Purchased courses dashboard

Admin analytics