import { Document, Schema, model } from 'mongoose';

export interface IImage extends Document {
    url: string;
    caption: string;
    votes: number;
};

export const imageSchema: Schema<IImage> = new Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
        default: "",
        trim: true,
    },
    votes: {
        type: Number,
        required: true,
        min: 0,
    },
});

const Image = model<IImage>('Image', imageSchema);

export default Image;