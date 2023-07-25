import { Document, Schema, model } from 'mongoose';

export interface IDuel extends Document {
    title: string;
    description: string;
    _id: string;
    slides: string[];
}

const duelSchema = new Schema<IDuel>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    _id: {
        type: String,
    },
    slides: [String],
}, { timestamps: true });

const Duel = model<IDuel>('Duel', duelSchema);

export default Duel;