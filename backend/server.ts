import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

import multer from 'multer';
import { uploadImage, getImageUrl } from './s3';
import crypto from 'crypto';

import DuelModel from './models/duel.model';
import uploadImagesRouter from './routes/images';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { url } from 'inspector';


dotenv.config();
const app = express();
const port = process.env.PORT;
const uri: string = process.env.FRAMEOFF_DB_URI!;

const bucketName: string = process.env.S3_BUCKET_NAME!;
const bucketRegion: string = process.env.S3_BUCKET_REGION!;
const accessKey: string = process.env.S3_ACCESS_KEY!;
const secretAccessKey: string = process.env.S3_SECRET_ACCESS_KEY!;
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

//app.use('/api/uploadimage', uploadImagesRouter);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const generateImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});


app.post('/api/uploadimage', upload.single('image'), async (req, res) => {
    const imageName = generateImageName();

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file!.buffer,
        ContentType: req.file!.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command);

    const url = getImageUrl(imageName);
    res.send(url);
})

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