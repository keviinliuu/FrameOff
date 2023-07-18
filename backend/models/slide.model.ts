import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISlide extends Document {
  imageUrl1: string;
  imageUrl2: string;
  slideTitle: string;
  imageTitle1: string;
  imageTitle2: string;
  imageDesc1: string;
  imageDesc2: string;
  sequenceNo: number;
}

export const slideSchema: Schema<ISlide> = new Schema({
  imageUrl1: {
    type: String,
    required: true
  },
  imageUrl2: {
    type: String,
    required: true
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
  sequenceNo: {
    type: Number,
    required: true,
  },
});

const Slide: Model<ISlide> = mongoose.model<ISlide>('Slide', slideSchema);

export default Slide;
