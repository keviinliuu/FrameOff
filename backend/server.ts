import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 6000;
const uri : string = process.env.FRAMEOFF_DB_URI!;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    wtimeoutMS: 2500,
    useUnifiedTopology : true 
} as ConnectOptions) .catch(err => {
    console.error(err.stack);
    process.exit(1);
}) .then(() => {
    app.listen(port, () => {
        console.log(`Server is listening port ${port}`);
    });
}); 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})