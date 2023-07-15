import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import imageSchema from './models/image.model';

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
    });ç
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.post('/', upload.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file!.filename)),
            contentType: 'image/png'
        }
    }
    imageSchema.create(obj)
        .then((item) => {
            item.save()
                .then(() => res.send("successfully uploaded"));
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
    });
});
