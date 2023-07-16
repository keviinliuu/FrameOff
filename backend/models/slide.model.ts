import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IImage } from './image.model';

export interface ISlide extends Document {
  image1: Types.ObjectId | IImage;
  image2: Types.ObjectId | IImage;
  slideTitle: string;
  imageTitle1: string;
  imageTitle2: string;
  imageDesc1: string;
  imageDesc2: string;
}

export const slideSchema: Schema<ISlide> = new Schema({
  image1: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  image2: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  slideTitle: {
    type: String,
    required: false,
  },
  imageTitle1: {
    type: String,
    required: false,
  },
  imageTitle2: {
    type: String,
    required: false,
  },
  imageDesc1: {
    type: String,
    required: false,
  },
  imageDesc2: {
    type: String,
    required: false,
  },
});

const Slide: Model<ISlide> = mongoose.model<ISlide>('Slide', slideSchema);

export default Slide;
