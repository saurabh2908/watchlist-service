import { Schema, model } from 'mongoose';

const WatchlistItemSchema = new Schema(
  {
    contentId: { type: String, required: true },
    contentType: {
      type: String,
      enum: ['MOVIE', 'TV_SHOW'],
      required: true
    },
    addedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const WatchlistSchema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  items: [WatchlistItemSchema]
});


export const WatchlistModel = model('Watchlist', WatchlistSchema);
