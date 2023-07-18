import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

import DuelModel from './models/duel.model';
import uploadImagesRouter from './routes/images';

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri: string = process.env.FRAMEOFF_DB_URI!;

// Configure Express server
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(uploadImagesRouter);

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

// Endpoint for creating an image
app.post('/api/createduel', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const slides = req.body.slides;

    const newDuel = new DuelModel({
        title,
        description,
        slides,
    });

    newDuel.save()
        .then(() => res.json('Poll created!'))
        .catch(err => res.status(400).json('Error' + err));
})