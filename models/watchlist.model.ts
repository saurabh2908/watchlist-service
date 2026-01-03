export interface WatchlistItem {
  contentId: string;
  contentType: 'MOVIE' | 'TV_SHOW';
  addedAt: Date;
}

export interface Watchlist {
  userId: string;
  items: WatchlistItem[];
}
