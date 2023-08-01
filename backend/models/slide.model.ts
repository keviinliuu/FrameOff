import { Document, Schema, Model, model, Types } from 'mongoose';
import { IImage, imageSchema } from './image.model';

export interface ISlide extends Document {
    slideTitle: string;
    slideDescription: string;
    index: number;
    image1: IImage;
    image2: IImage;
};

type SlideDocumentOverrides = {
    image1: IImage & Types.Subdocument<IImage>;
    image2: IImage & Types.Subdocument<IImage>;
}
type SlideModelType = Model<ISlide, {}, SlideDocumentOverrides>;

export const slideSchema = new Schema<ISlide, SlideModelType>({
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

const Slide = model<ISlide, SlideModelType>('Slide', slideSchema);

export default Slide;