import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song, SongPayloadNew } from "./songTypes";

export interface SongsState {
  items: Song[];
  loading: boolean;
  error?: string | null;
  filterGenre: string;
  editing?: Song | null;
}

const initialState: SongsState = {
  items: [],
  loading: false,
  error: null,
  filterGenre: "",
  editing: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    addSongRequested(state, _action: PayloadAction<SongPayloadNew>) {
      state.loading = true;
    },
    addSongSuccess(state) {
      state.loading = false;
      state.error = null; // ✅ clear banner
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongRequested(state, _action: PayloadAction<{ id: string; data: SongPayloadNew }>) {
      state.loading = true;
    },
    updateSongSuccess(state) {
      state.loading = false;
      state.error = null; // ✅ clear banner
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSongRequested(state, _action: PayloadAction<{ id: string }>) {
      state.loading = true;
    },
    deleteSongSuccess(state) {
      state.loading = false;
      state.error = null; // ✅ clear banner
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setFilterGenre(state, action: PayloadAction<string>) {
      state.filterGenre = action.payload;
    },
    setEditingSong(state, action: PayloadAction<Song | null>) {
      state.editing = action.payload;
    },
  },
});

export const {
  fetchSongsRequested,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequested,
  addSongSuccess,
  addSongFailure,
  updateSongRequested,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequested,
  deleteSongSuccess,
  deleteSongFailure,
  setFilterGenre,
  setEditingSong,
} = songsSlice.actions;

export default songsSlice.reducer;
