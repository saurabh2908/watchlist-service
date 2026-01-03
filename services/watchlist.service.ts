import { WatchlistItem } from '../models/watchlist.model';
import { WatchlistModel } from '../models/watchlist.mongo';
import redis from '../utils/redis';


export const getWatchlist = async (
  userId: string,
  page: number,
  limit: number
) => {
  const cacheKey = `watchlist:${userId}`;

  let items: any[] = [];

  try {
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        items = JSON.parse(cached);
      }
    }

    if (items.length === 0) {
      const watchlist = await WatchlistModel.findOne({ userId }).lean();
      items = watchlist?.items || [];

      if (redis) {
        await redis.setex(cacheKey, 60, JSON.stringify(items));
      }
    }
  } catch (err) {
    console.error('Error fetching watchlist:', err);
    items = [];
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    page,
    limit,
    total: items.length,
    items: items.slice(start, end),
  };
};


export const addToWatchlist = async (
  userId: string,
  item: WatchlistItem
) => {
  // Check if item already exists
  const existingWatchlist = await WatchlistModel.findOne({
    userId,
    'items.contentId': item.contentId
  });

  if (existingWatchlist) {
    // Item already exists, don't add it again
    if (redis) {
      await redis.del(`watchlist:${userId}`);
    }
    return { success: true, message: 'Item already in watchlist' };
  }

  // Item doesn't exist, add it
  await WatchlistModel.updateOne(
    { userId },
    {
      $push: {
        items: {
          contentId: item.contentId,
          contentType: item.contentType,
          addedAt: new Date()
        }
      }
    },
    { upsert: true }
  );

  if (redis) {
    await redis.del(`watchlist:${userId}`);
  }

  return { success: true };
};


export const removeFromWatchlist = async (
  userId: string,
  contentId: string
) => {
  await WatchlistModel.updateOne(
    { userId },
    {
      $pull: {
        items: { contentId }
      }
    }
  );

  if (redis) {
    await redis.del(`watchlist:${userId}`);
  }

  return { success: true };
};
