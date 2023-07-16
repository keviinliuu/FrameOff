import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISlide, slideSchema } from './slide.model';

export interface IDuel extends Document {
    title: string;
    description: string;
    slides: ISlide[];
}

const duelSchema : Schema<IDuel> = new Schema<IDuel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    slides: [slideSchema],
})

const Duel: Model<IDuel> = mongoose.model<IDuel>('Duel', duelSchema);

export default Duel;