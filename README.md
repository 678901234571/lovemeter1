# Love Meter 💖

A modern, fun "Love Meter" web application with a beautiful romantic UI built using Node.js, Express, MongoDB, and Vanilla JS/CSS (bundled with Vite).

## Features
- **Modern UI**: Glassmorphism, neon gradients, and floating heart particles.
- **Dark/Light Mode**: Smooth transitions between themes.
- **Love Calculation**: Generates a score and a cute message.
- **Admin Dashboard**: Secure session-based authentication to view all user results.

## Tech Stack
- **Frontend**: HTML5, Vanilla CSS3, Vanilla JS, Vite.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: `express-session`, `bcrypt`.

## Installation & Setup

1. **Clone or Extract the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Ensure you have a `.env` file in the root directory (one has been provided with defaults). Adjust the values as necessary:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/love-meter
   SESSION_SECRET=super_secret_love_meter_key_generate_yours
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=adminpassword
   ```

4. **Start MongoDB:**
   Ensure your local MongoDB instance is running, or replace `MONGODB_URI` with a MongoDB Atlas cluster URI.

5. **Initial Setup (Create Admin User):**
   Run the setup script to create the initial admin account (using the credentials from `.env`):
   ```bash
   node backend/scripts/setup.js
   ```

## Running the App

### Development Mode
To run both the Vite frontend server and the Express backend concurrently:
```bash
npm run dev
```
- Frontend will be available on Vite's default port (e.g., `http://localhost:5173`).
- Backend API will run on `http://localhost:3000`.

### Production Mode
To build the frontend and serve it using Express:
```bash
# 1. Build the frontend assets into the /dist folder
npm run build

# 2. Set NODE_ENV to production (Linux/Mac)
export NODE_ENV=production

# On Windows (PowerShell):
$env:NODE_ENV="production"

# 3. Start the server
npm start
```
The application will be accessible at `http://localhost:3000`. The Admin dashboard can be accessed at `http://localhost:3000/admin`.
