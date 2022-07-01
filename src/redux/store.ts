import { configureStore } from "@reduxjs/toolkit";
import rssSlice from "./reducers/rssSlice";

const store = configureStore({
  reducer: {
    rss: rssSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
