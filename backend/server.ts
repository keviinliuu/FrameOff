import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

import multer from 'multer';
import { uploadImage, getImageUrl } from './s3';
import crypto from 'crypto';

dotenv.config();
const app = express();
const port = process.env.PORT;
const uri: string = process.env.FRAMEOFF_DB_URI!;

// Configure Express server
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

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
        console.log(`Server is listening port ${port}`);
    });
});

// Log successful MongoDB connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

// Temporary image set-up, to be moved...
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const generateImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
