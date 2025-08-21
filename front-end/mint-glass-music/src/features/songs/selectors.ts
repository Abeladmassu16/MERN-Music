import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectSongsState = (s: RootState) => s.songs;
export const selectAllSongs = (s: RootState) => s.songs.items;
export const selectFilterGenre = (s: RootState) => s.songs.filterGenre;

export const selectFilteredSongs = createSelector(
  [selectAllSongs, selectFilterGenre],
  (songs, genre) => (genre ? songs.filter((s) => s.genre === genre) : songs)
);

export const selectGenres = createSelector([selectAllSongs], (songs) => {
  return Array.from(new Set(songs.map((s) => s.genre))).sort();
});
