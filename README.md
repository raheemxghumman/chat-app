# Chat App

A full-stack real-time chat application built with React, Vite, Express, MongoDB, Socket.IO, Zustand, Tailwind CSS, and DaisyUI.

## Features

- User signup, login, logout, and profile updates
- Real-time messaging with Socket.IO
- Online user status
- Image uploads through Cloudinary
- Theme switching with DaisyUI themes
- MongoDB support with an in-memory MongoDB fallback for local testing

## Project Structure

```text
.
├── backend/    # Express API, Socket.IO server, MongoDB models
├── frontend/   # React + Vite client
└── package.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB connection string, optional for local testing because the backend can fall back to in-memory MongoDB
- A Cloudinary account, optional unless you want image upload/profile image features to work

## Environment Variables

Create a backend environment file:

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env`:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For a quick local run, you can leave `MONGODB_URI` empty and the app will use the in-memory MongoDB fallback.

## Run Locally

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

Start the backend:

```bash
cd ../backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:5001
```

## Production Build

From the project root:

```bash
npm run build
npm start
```

The production server serves the built frontend from the backend when `NODE_ENV=production` is set.
