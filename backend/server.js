require('dotenv').config(); // load .env variables

const express = require('express');
const mongoose = require('mongoose');
const musicRoutes = require('./routes/musicRoutes');

const app = express();

// Middleware
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/music', musicRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start server
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
