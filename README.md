# JWT Authentication with React and Node.js

This project demonstrates a full-stack application using React for the frontend and Node.js for the backend, implementing JWT (JSON Web Token) authentication for secure user login.

## Project Structure

- **front-end:** React application that handles user interface and authentication.
- **back-end:** Node.js server that manages authentication and user data.

## front-end

### Features
- User login functionality with credential validation.
- Token-based authentication for session management.
- Protected routes that restrict access to authenticated users.

### Technologies Used
- React
- Axios (for API calls)
- JWT for authentication

### How to Run the Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
4. Open your browser and go to http://localhost:3000.

## back-end

### Features
- API endpoints for user authentication.
- Secure token generation and validation.

### Technologies Used
- Node.js
- Express
- MongoDB (or your choice of database)
- JWT for authentication

### How to Run the Backend
1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
3. Start the server:
   ```
   npm start
4. Ensure your database is running and accessible.

### Usage
- Start the backend server.
- Start the frontend application.
- Navigate to the frontend in your browser to access the login page.
- Enter your credentials to log in. Upon successful authentication, a JWT is generated and used for subsequent requests.

### Conclusion
This project provides a robust framework for implementing user authentication in web applications. It showcases how to securely handle user credentials and manage sessions using JWTs, enhancing both security and user experience.