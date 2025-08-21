import { all, call, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";
import { fetchStatsRequested, fetchStatsSuccess, fetchStatsFailure } from "./statsSlice";
import { STATS_PATH } from "../../api/endpoints.ts";

function* fetchStats(): Generator<any, void, any> {
  try {
    const res = yield call(client.get, STATS_PATH); // "/stats/all"
    yield put(fetchStatsSuccess(res.data));
  } catch (err: any) {
    yield put(fetchStatsFailure(err?.message || "Failed to load stats"));
  }
}

export default function* statsSaga(): Generator<any, void, any> {
  yield all([takeLatest(fetchStatsRequested.type, fetchStats)]);
}
