import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RssResponse {
  title: string;
  description: string;
  img: string;
  date: Date;
}

export interface RssState {
  rssList: RssResponse[];
}

const initialState: RssState = {
  rssList: [],
};

export const fetchRssXML = createAsyncThunk(
  "rss/fetchRssXML",
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

export const rssSlice = createSlice({
  name: "rss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRssXML.fulfilled, (state, action) => {});
  },
});

export default rssSlice.reducer;
