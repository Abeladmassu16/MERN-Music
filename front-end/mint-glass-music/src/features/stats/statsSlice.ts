import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/** Aggregation row shapes coming from your controller */
export interface GenreCount {
  _id: string | null;
  count: number;
}
export interface ArtistAgg {
  _id: string | null;
  songsCount: number;
  albums: string[];
}
export interface AlbumAgg {
  _id: string | null;
  songsCount: number;
}

/**
 * Stats can come in two shapes:
 *  - Original (totalSongs/byGenre/avgDurationSec)
 *  - Your controller's shape (totals + songsPerGenre/Artist/Album arrays)
 * All fields are optional so the UI can handle either.
 */
export interface Stats {
  // original simple shape
  totalSongs?: number;
  byGenre?: Record<string, number>;
  avgDurationSec?: number | null;

  // controller-expanded shape
  totalArtists?: number;
  totalAlbums?: number;
  totalGenres?: number;
  songsPerGenre?: GenreCount[];
  songsPerArtist?: ArtistAgg[];
  songsPerAlbum?: AlbumAgg[];
}

interface StatsState {
  data: Stats | null;
  loading: boolean;
  error?: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess(state, action: PayloadAction<Stats>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequested, fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;
export default statsSlice.reducer;
