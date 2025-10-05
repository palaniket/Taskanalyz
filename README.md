TaskAnalyz – Project Documentation

1. Project Overview

TaskAnalyz is a full-stack web application designed to help users manage, track, and analyze tasks efficiently. It provides a simple interface for creating, updating, and deleting tasks, along with detailed analytics of task progress and trends. The project leverages React/Next.js for the frontend, Node.js/Express for the backend API, and MongoDB Atlas for data storage.

2. Features / Functionalities
2.1 Task Management

Create Tasks: Users can add tasks with details such as title, description, priority, and due date.

Read / View Tasks: Fetch and display all tasks in a structured list or table.

Update Tasks: Modify task details or status (e.g., pending, in-progress, completed).

Delete Tasks: Remove tasks permanently from the database.

2.2 Analytics & Insights

Displays the number of completed, pending, and in-progress tasks.

Provides time-based task trends (daily/monthly analytics).

Supports filtering by task status or other criteria.

2.3 Backend API

CRUD endpoints for tasks:

GET /api/gettasks → Fetch all tasks.

POST /api/addtask → Add a new task.

PUT /api/updatetask/:id → Update a task.

DELETE /api/deletetask/:id → Delete a task.

Handles error responses with meaningful messages.

Connects to MongoDB Atlas with optimized serverless connection handling.

2.4 Deployment & Hosting

Frontend & API hosted on Vercel.

Database hosted on MongoDB Atlas.

Environment variables securely stored in Vercel for production.

3. Technology Stack
Layer	Technology
Frontend	React.js / Next.js
Backend	Node.js, Express.js (API Routes)
Database	MongoDB Atlas
Deployment	Vercel
State Management	React Hooks (useState, useEffect)
Styling	CSS / Tailwind CSS (optional)




4. System Architecture
Frontend (Next.js)
        │
        │ HTTP Requests (fetch/axios)
        ▼
Backend API (Node.js/Express or Next.js API Routes)
        │
        │ Mongoose / MongoDB Driver
        ▼
MongoDB Atlas (Database)

5. API Reference
Endpoint	Method	Body / Params	Response

/api/gettasks	-> get all the tasks from the database

/api/addtask	-> Post new task to the database

/api/updatetask/:id	->Update the existing tasks.

/api/deletetask/:id	DELETE	-> Delete the tasks with matching id

6. Best Practices Implemented

Serverless DB Connection Caching for Vercel.

Error Handling for API requests.

Environment Variables for sensitive data.

React Hooks for state and lifecycle management.

Responsive Design for cross-device usability.
