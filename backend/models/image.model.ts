import mongoose, { Schema } from 'mongoose';

interface IImage extends Document {
    image: {
      data: Buffer;
      contentType: string;
    };
  } 

const imageSchema : Schema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

const ImageModel = mongoose.model<IImage>('Image',imageSchema);

export default ImageModel;