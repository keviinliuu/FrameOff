import mongoose, { Document, Schema } from 'mongoose';

export interface IData extends Document {
  message: string;
}

const dataSchema: Schema<IData> = new Schema({
  message: {
    type: String,
    required: true,
  },
});

const DataModel = mongoose.model<IData>('Data', dataSchema);

export default DataModel;
