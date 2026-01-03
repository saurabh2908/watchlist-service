import mongoose from 'mongoose';
import { WatchlistModel } from '../models/watchlist.mongo';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  await WatchlistModel.deleteMany({});

  await WatchlistModel.create({
    userId: 'mock-user-1',
    items: [
      {
        contentId: 'movie-1',
        contentType: 'MOVIE',
        addedAt: new Date()
      },
      {
        contentId: 'tv-1',
        contentType: 'TV_SHOW',
        addedAt: new Date()
      }
    ]
  });

  console.log('Seed data created');
  await mongoose.disconnect();
})();
