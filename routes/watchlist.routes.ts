import { Router } from 'express';
import { getWatchlistHandler } from '../controllers/watchlist.controller';
import { addToWatchlistHandler } from '../controllers/watchlist.controller';
import { removeFromWatchlistHandler } from '../controllers/watchlist.controller';

const router = Router();

router.get('/', getWatchlistHandler);
router.post('/', addToWatchlistHandler);
router.delete('/:contentId', removeFromWatchlistHandler);


export default router;
