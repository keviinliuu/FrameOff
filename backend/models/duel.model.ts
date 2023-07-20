import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { ISlide, slideSchema } from './slide.model';

export interface IDuel extends Document {
    title: string;
    description: string;
    _id: string;
    slides: Types.DocumentArray<ISlide>;
}

type DuelDocumentProps = {
    slides: Types.DocumentArray<ISlide>;
}
type DuelModelType = Model<IDuel, {}, DuelDocumentProps>;

const duelSchema : Schema<IDuel> = new Schema<IDuel>({
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
},
{ timestamps: true });

const Duel: Model<IDuel> = mongoose.model<IDuel>('Duel', duelSchema);

export default Duel;