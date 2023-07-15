import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  name: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

const imageSchema: Schema<IImage> = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;
