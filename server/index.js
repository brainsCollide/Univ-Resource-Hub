require('dotenv')
const express = require('express');
const connectDB = require('./config/db'); 
const content = require('./route/content');
const authRoutes = require('./route/authentication');
const resourceRoutes = require('./route/resource');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: process.env.FRONTEND_URL,  // Frontend URL
    credentials: true
}));

console.log("CORS enabled for:", process.env.FRONTEND_URL);

// Also, set this header in responses:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/api/content', content);
app.use("/api/auth", authRoutes);
app.use('/api/resources', resourceRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));