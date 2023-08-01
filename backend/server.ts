import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

import imagesRouter from './routes/images';
import duelsRouter from './routes/duels';

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri: string = process.env.FRAMEOFF_DB_URI!;

// Configure rate limit middleware
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000, // Maximum 1000 requests per hour per IP address
});

// Configure Express server
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(imagesRouter);
app.use(duelsRouter);

// Connect to MongoDB and launch Node.js runtime
mongoose.connect(uri, {
    useNewUrlParser: true,
    wtimeoutMS: 2500,
    useUnifiedTopology: true
} as ConnectOptions).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});

// Log successful MongoDB connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});