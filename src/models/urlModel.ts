import { Schema, model, Document } from 'mongoose';

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  date: Date; // Ensure this is a Date type
  clicks: number;
}

const urlSchema = new Schema<IUrl>({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  urlCode: { type: String, required: true },
  date: { type: Date, required: true }, // Correct the type to Date
  clicks: { type: Number, default: 0 }
});

export default model<IUrl>('Url', urlSchema);
