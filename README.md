# URL Shortener - Local Setup Guide

## Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (comes with Node.js)

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/url-shortener
```

4. Start MongoDB:
```bash
# On Windows
mongod




5. Start the backend server:
```bash
npm start
```

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Dependencies Used

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "joi": "^17.9.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "axios": "^1.3.4",
    "vite": "^4.2.0"
  }
}
```

## Running the Application

1. Make sure MongoDB is running
2. Start the backend server (in backend directory):
```bash
npm start
```
3. Start the frontend development server (in frontend directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Testing the Application

1. Open http://localhost:5173 in your browser
2. Try creating a short URL by entering a long URL
3. Test the redirect by visiting the generated short URL
4. View statistics by entering the short code in the statistics page
5. Try updating and deleting URLs in the management section

## Troubleshooting

1. If MongoDB connection fails:
   - Make sure MongoDB is running
   - Check if the port 27017 is available
   - Verify the MONGODB_URI in .env file

2. If backend server fails to start:
   - Check if port 3000 is available
   - Verify all dependencies are installed
   - Check the .env file configuration

3. If frontend fails to start:
   - Make sure you're in the frontend directory
   - Verify all dependencies are installed
   - Check if port 5173 is available 