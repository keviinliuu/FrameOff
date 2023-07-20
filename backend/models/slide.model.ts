import mongoose, { Document, Schema, Model } from 'mongoose';
import { IImage, imageSchema } from './image.model';

export interface ISlide extends Document {
    slideTitle: string;
    slideDescription: string;
    index: number;
    image1: IImage;
    image2: IImage;
};

type SlideDocumentOverrides = {
    image1: IImage;
    image2: IImage;
}
type SlideModelType = Model<ISlide, {}, SlideDocumentOverrides>;

export const slideSchema: Schema<ISlide> = new Schema({
    slideTitle: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
    slideDescription: {
        type: String,
        required: false,
        default: "",
    },
    index: {
        type: Number,
        required: true,
    },
    image1: {
        type: imageSchema,
        required: true,
    },
    image2: {
        type: imageSchema,
        required: true,
    },
});

const Slide: Model<ISlide> = mongoose.model<ISlide>('Slide', slideSchema);

export default Slide;