import { all, fork } from "redux-saga/effects";
import songsSaga from "../features/songs/songSaga";
import statsSaga from "../features/stats/statsSaga";


export default function* rootSaga() {
yield all([fork(songsSaga), fork(statsSaga)]);
}