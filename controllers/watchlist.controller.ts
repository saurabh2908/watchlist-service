import { Request, Response, RequestHandler } from 'express';
import { getWatchlist } from '../services/watchlist.service';
import { addToWatchlist } from '../services/watchlist.service';
import { removeFromWatchlist } from '../services/watchlist.service';

export const getWatchlistHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = 'mock-user-1';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const data = await getWatchlist(userId, page, limit);
    res.status(200).json(data);
  } catch (err: any) {
    console.error('Error fetching watchlist:', err);
    res.status(500).json({
      message: 'Error fetching watchlist',
      error: err.message
    });
  }
};



export const addToWatchlistHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = 'mock-user-1';
    const { contentId, contentType } = req.body;

    if (!contentId || !contentType) {
      return res.status(400).json({
        message: 'contentId and contentType are required'
      });
    }

    const data = await addToWatchlist(userId, {
      contentId,
      contentType,
      addedAt: new Date()
    });

    res.status(201).json(data);
  } catch (err: any) {
    console.error('Error adding to watchlist:', err);
    res.status(500).json({
      message: 'Error adding item to watchlist',
      error: err.message
    });
  }
};

export const removeFromWatchlistHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = 'mock-user-1';
    const { contentId } = req.params;

    if (!contentId) {
      return res.status(400).json({
        message: 'contentId is required'
      });
    }

    const data = await removeFromWatchlist(userId, contentId);

    res.status(200).json({
      message: 'Item removed from watchlist',
      data
    });
  } catch (err: any) {
    console.error('Error removing from watchlist:', err);
    res.status(500).json({
      message: 'Error removing item from watchlist',
      error: err.message
    });
  }
};

