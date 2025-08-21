import { all, call, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";
import {
  fetchSongsRequested, fetchSongsSuccess, fetchSongsFailure,
  addSongRequested, addSongSuccess, addSongFailure,
  updateSongRequested, updateSongSuccess, updateSongFailure,
  deleteSongRequested, deleteSongSuccess, deleteSongFailure,
} from "./songSlice";
import { fetchStatsRequested } from "../stats/statsSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song, SongPayloadNew } from "./songTypes";
import { SONGS_PATH, joinPath } from "../../api/endpoints.ts";

function normalizeSong(raw: any): Song {
  const id = String(raw?.id ?? raw?._id ?? "");
  return {
    id,
    _id: raw?._id,
    title: raw?.title ?? raw?.name ?? "",
    artist: raw?.artist ?? raw?.singer ?? "",
    genre: raw?.genre ?? raw?.category ?? "",
    album: raw?.album ?? undefined,
    durationSec:
      typeof raw?.durationSec === "number"
        ? raw.durationSec
        : typeof raw?.duration === "number"
        ? raw.duration
        : undefined,
  };
}

function compatPayload(p: SongPayloadNew) {
  const payload: any = {
    title: p.title,
    artist: p.artist,
    genre: p.genre,
  };
  if (p.album) payload.album = p.album;

  // synonyms many backends accept
  payload.name = p.title;
  payload.singer = p.artist;
  payload.category = p.genre;
  if (p.album) payload.record = p.album;

  if (typeof p.durationSec === "number") {
    payload.durationSec = p.durationSec;
    payload.duration = p.durationSec;
  }
  return payload;
}

function errMessage(err: any): string {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Request failed"
  );
}

function* fetchSongs(): Generator<any, void, any> {
  try {
    const res = yield call(client.get, SONGS_PATH);
    const items: Song[] = Array.isArray(res?.data) ? res.data.map(normalizeSong) : [];
    yield put(fetchSongsSuccess(items));
  } catch (err: any) {
    yield put(fetchSongsFailure(errMessage(err)));
  }
}

function* addSong(action: PayloadAction<SongPayloadNew>): Generator<any, void, any> {
  try {
    yield call(client.post, SONGS_PATH, compatPayload(action.payload));
    yield put(addSongSuccess());
    yield put(fetchSongsRequested());
    yield put(fetchStatsRequested());
  } catch (err: any) {
    yield put(addSongFailure(errMessage(err)));
  }
}

function* updateSong(action: PayloadAction<{ id: string; data: SongPayloadNew }>): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    yield call(client.patch, joinPath(SONGS_PATH, id), compatPayload(data));
    yield put(updateSongSuccess());
    yield put(fetchSongsRequested());
    yield put(fetchStatsRequested());
  } catch (err: any) {
    yield put(updateSongFailure(errMessage(err)));
  }
}

function* deleteSong(action: PayloadAction<{ id: string }>): Generator<any, void, any> {
  try {
    const { id } = action.payload;
    yield call(client.delete, joinPath(SONGS_PATH, id));
    yield put(deleteSongSuccess());
    yield put(fetchSongsRequested());
    yield put(fetchStatsRequested());
  } catch (err: any) {
    yield put(deleteSongFailure(errMessage(err)));
  }
}

export default function* songsSaga(): Generator<any, void, any> {
  yield all([
    takeLatest(fetchSongsRequested.type, fetchSongs),
    takeLatest(addSongRequested.type, addSong),
    takeLatest(updateSongRequested.type, updateSong),
    takeLatest(deleteSongRequested.type, deleteSong),
  ]);
}
