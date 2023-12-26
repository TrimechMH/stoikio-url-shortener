import { Schema } from 'mongoose';
const YOUR_EXPIRATION_TIME_IN_SECONDS = 10;
export const UrlShortenSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

UrlShortenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: YOUR_EXPIRATION_TIME_IN_SECONDS },
);
