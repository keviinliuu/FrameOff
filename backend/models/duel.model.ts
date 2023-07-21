import mongoose, { Document, Schema, Model, model, Types } from 'mongoose';
import { ISlide, slideSchema } from './slide.model';

export interface IDuel extends Document {
    title: string;
    description: string;
    _id: string;
    slides: Types.DocumentArray<ISlide>;
}

export type DuelDocumentProps = {
    slides: Types.DocumentArray<ISlide>;
};
type DuelModelType = Model<IDuel, {}, DuelDocumentProps>;

const duelSchema = new Schema<IDuel, DuelModelType>({
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
    slides: [slideSchema],
}, { timestamps: true });

const Duel = model<IDuel>('Duel', duelSchema);

export default Duel;
