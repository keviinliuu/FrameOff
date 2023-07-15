import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer'
import ImageModel from './models/image.model';

dotenv.config();

const app = express();
const port = 6000;
const uri: string = process.env.FRAMEOFF_DB_URI!;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

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

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('image')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } 
        else {
            const newImage = new ImageModel({
                image: {
                    data: req.file?.filename,
                    contentType: 'image/png'
                },
            });

            newImage
                .save()
                .then(() => res.send('Successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
});
