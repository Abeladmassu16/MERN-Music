import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "../features/songs/songSlice";
import statsReducer from "../features/stats/statsSlice";
import rootSaga from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
reducer: {
songs: songsReducer,
stats: statsReducer,
},
middleware: (getDefault) => getDefault({ thunk: false }).concat(sagaMiddleware),
devTools: true,
});


sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;