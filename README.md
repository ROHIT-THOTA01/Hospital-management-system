# Hospital Management System

A full-stack MERN application for managing hospitals, with features for creating, viewing, updating, and deleting hospital records.

## Features

- User authentication (login/signup)
- Dark mode toggle
- Hospital listing with pagination
- Search hospitals by city
- Detailed hospital view
- Admin panel for hospital management
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Express Validator

### Frontend
- React.js
- React Router
- Material UI
- Context API for state management
- Axios for API requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd hospital-management
```

2. Install backend dependencies:
```
cd server
npm install
```

3. Install frontend dependencies:
```
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital-management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running the Application

1. Start MongoDB service (if using local MongoDB)

2. Start the backend server:
```
cd server
npm run server
```

3. Start the frontend development server:
```
cd ../client
npm start
```

4. To run both frontend and backend concurrently:
```
cd server
npm run dev
```

5. Access the application at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Hospitals
- `POST /api/v1/hospitals/create` - Create a new hospital
- `GET /api/v1/hospitals?city=cityname` - Get hospitals by city
- `DELETE /api/v1/hospitals/delete?id=hospitalId` - Delete a hospital
- `PUT /api/v1/hospitals/update?id=hospitalId` - Update a hospital
- `POST /api/v1/hospitals/details?id=hospitalId` - Add hospital details

## Deployment

The application can be deployed using:
- Backend: Render
- Frontend: Netlify

## License

This project is licensed under the MIT License. 