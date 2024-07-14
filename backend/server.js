const express = require('express');
const cors = require('cors'); // Import the cors middleware
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const errorHandler = require('./middlewares/errorMiddleware');


dotenv.config();
connectDB();

const app = express();

app.use(express.json());// to parse JSON bodies
app.use(cookieParser());

// Use the error handling middleware
app.use(errorHandler);

// Configure CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Enable cookies to be sent
}));


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));