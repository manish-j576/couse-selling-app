Course Selling Application – Backend (Version 1)

This backend powers a course-selling platform using Node.js, Express, and MongoDB.  
It supports user authentication, admin operations, course management, and purchase tracking.

------------------------------------------------------------
Features Included in Backend v1
------------------------------------------------------------

1. User Authentication
- User signup
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware

2. Admin Functionality
- Admin signup
- Admin login
- Ability to create new courses
- Update course details
- Delete courses

3. Course Management
- Fetch all courses
- Fetch course by ID
- Purchase a course
- Track user-course purchases
- Fetch purchased courses for a user

4. Database Structure (MongoDB)
Collections used:
- Users
- Admins
- Courses
- Purchases (userId and courseId mapping)

------------------------------------------------------------
Project Folder Structure
------------------------------------------------------------

project/
  middleware/
    adminMiddleware.js
    userMiddleware.js
  routes/
    admin.js
    course.js
    user.js
  schema/
    adminSchema.js
    courseSchema.js
    purchaseSchema.js
    userSchema.js
  node_modules/
  .env
  .env.example
  .gitignore
  db.js
  index.js
  package.json
  package-lock.json
  README.md

------------------------------------------------------------
Tech Stack
------------------------------------------------------------
Node.js
Express.js
MongoDB
Mongoose
bcrypt
JSON Web Tokens (JWT)
dotenv

------------------------------------------------------------
Environment Variables (.env Required)
------------------------------------------------------------

MONGO_URI = your mongo connection string
JWT_USER_SECRET = your jwt secret key
JWT_ADMIN_SECRET = your jwt secret key
PORT = 3000 or any port number

------------------------------------------------------------
How to Run the Project Locally
------------------------------------------------------------

1. Clone the repository
   git clone <your-repo-url>

2. Install dependencies
   npm install

3. Add your .env file to the root of the project.

4. Start the server
   npm start

The server will run at:
http://localhost:3000

------------------------------------------------------------
API Overview
------------------------------------------------------------

User Routes:
POST /user/signup
POST /user/login
GET  /user/courses

Admin Routes:
POST /admin/signup
POST /admin/login
POST /admin/course
PUT /admin/course/:id
DELETE /admin/course/:id

Course Routes:
GET /courses
GET /courses/:id

Purchase Routes:
POST /user/purchase/:courseId
GET /user/purchased

------------------------------------------------------------
Current Version Status
------------------------------------------------------------

Backend v1 is fully functional with:
- Working authentication
- Course creation and purchase system
- Purchased courses retrieval
- Basic error handling
- Clean and scalable folder structure

------------------------------------------------------------
Upcoming Improvements (v2)
------------------------------------------------------------

- Pagination and search for courses
- Role-based access control
- File uploads for course thumbnails
- Payment integration (Stripe or Razorpay)
- Improved error handling and validation
- Admin dashboard enhancements

------------------------------------------------------------
End of File
------------------------------------------------------------