# Flask JWT Authentication System with React Frontend

A complete full-stack authentication system with Flask backend and React frontend, featuring JWT-based authentication, role-based access control, and modern UI.

## 🚀 Features

### Backend (Flask)
- **JWT Authentication**: Secure token-based authentication
- **User Registration**: Account creation with validation
- **Role-based Access Control**: Admin and regular user roles
- **Protected Routes**: Dashboard, profile, and admin endpoints
- **CORS Support**: Cross-origin resource sharing configured
- **Database**: SQLAlchemy with SQLite (easily configurable for PostgreSQL/MySQL)
- **Password Security**: Bcrypt password hashing
- **Error Handling**: Comprehensive error messages

### Frontend (React)
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Authentication Flow**: Login, registration, and protected routes
- **User Dashboard**: Personal dashboard with user statistics
- **Form Validation**: Client-side validation with error messages
- **Token Management**: Automatic JWT token handling
- **Navigation**: React Router for single-page application
- **API Integration**: Axios with interceptors for API calls

## 📁 Project Structure

```
flask/
├── backend/                 # Flask backend
│   ├── app/
│   │   ├── __init__.py      # App factory and configuration
│   │   ├── extensions.py    # Flask extensions
│   │   ├── models.py        # User model
│   │   └── routes/
│   │       ├── auth.py      # Authentication routes
│   │       └── protected.py # Protected routes
│   ├── migrations/          # Database migrations
│   ├── requirements.txt     # Python dependencies
│   ├── run.py              # Application entry point
│   └── .env                # Environment variables
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── api.js          # API service
│   │   ├── App.jsx         # Main app component
│   │   ├── index.js        # React entry point
│   │   └── styles.css      # Global styles
│   └── package.json        # Node dependencies
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flask
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   DATABASE_URL=sqlite:///app.db
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. **Initialize database**
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. **Run the backend**
   ```bash
   python run.py
   ```
   
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you have dependency issues:
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   Frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user info (requires JWT)

### Protected Routes (`/api`)
- `GET /dashboard` - User dashboard (requires JWT)
- `GET /profile` - User profile (requires JWT)
- `GET /admin` - Admin panel (requires JWT + admin role)

## 🎯 Usage Examples

### Registration
```javascript
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```javascript
POST /api/auth/login
{
  "username": "testuser",
  "password": "password123"
}
```

### Access Protected Route
```javascript
GET /api/dashboard
Headers: {
  "Authorization": "Bearer <jwt-token>"
}
```

## 🔧 Configuration

### Environment Variables
- `SECRET_KEY`: Flask app secret key
- `JWT_SECRET_KEY`: JWT token secret key
- `DATABASE_URL`: Database connection string
- `FLASK_ENV`: Environment (development/production)
- `FLASK_DEBUG`: Debug mode (True/False)

### Database Configuration
Default uses SQLite. To use PostgreSQL or MySQL:

```python
# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost/dbname

# MySQL
DATABASE_URL=mysql://username:password@localhost/dbname
```

## 🎨 Features in Detail

### Authentication Flow
1. **Registration**: User creates account → Success message → Redirect to login
2. **Login**: User enters credentials → JWT token generated → Redirect to dashboard
3. **Protected Access**: JWT token validated → Access granted to protected routes
4. **Error Handling**: Clear error messages for invalid credentials, missing users, etc.

### User Experience
- **Registration**: Shows "Registration successful! Please login with your credentials."
- **Login Errors**: 
  - Non-existent user: "Login first - Please register your account"
  - Wrong password: "Invalid password"
- **Auto-redirect**: Registration → Login (2 seconds)
- **Token Storage**: JWT tokens stored in localStorage
- **Auto-logout**: Redirect to login on token expiration

### Security Features
- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Short-lived access tokens
- **CORS Protection**: Configured for frontend origin only
- **Input Validation**: Server-side validation for all inputs
- **Role-based Access**: Admin-only endpoints protected

## 🚀 Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   python run.py
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000 (root endpoint)

## 📝 Default User

For testing, you can use:
- **Username**: `admin`
- **Password**: `admin123`

This user has admin privileges and can access the admin panel.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running and CORS is properly configured
2. **JWT Token Issues**: Check token expiration and storage
3. **Database Connection**: Verify DATABASE_URL in .env file
4. **Dependency Conflicts**: Use `--legacy-peer-deps` for npm install

### Debug Mode

Enable debug mode in backend:
```python
FLASK_DEBUG=True
```

Check browser console for frontend errors and backend logs for API issues.

## 🔗 Technologies Used

### Backend
- **Flask**: Web framework
- **Flask-JWT-Extended**: JWT authentication
- **Flask-SQLAlchemy**: Database ORM
- **Flask-Bcrypt**: Password hashing
- **Flask-CORS**: Cross-origin requests
- **Flask-Migrate**: Database migrations

### Frontend
- **React**: UI framework
- **React Router**: Navigation
- **Axios**: HTTP client
- **CSS3**: Styling with gradients and animations

---

**Happy Coding! 🎉**
