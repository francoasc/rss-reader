import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addHttpToUrl } from "../../utils/strings";
// No TypeScript support for rssParser package
// @ts-ignore
import * as rssParser from "react-native-rss-parser";

export interface RssResponse {
  title: string;
  description: string;
  image: string;
  date: Date;
  stringifiedDate: string;
  url: string;
  id: string;
}

export const errorImage =
  "https://previews.123rf.com/images/rms164/rms1641504/rms164150400011/38672644-vector-error-icon.jpg";

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

    return rssParser.parse(response.data);
  }
);

export const rssSlice = createSlice({
  name: "rss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRssXML.fulfilled, (state, action) => {
      state.rssList = action.payload.items.map((item: any) => {
        const description = item.description
          ? item.description.trim()
          : item.content;
        const imgRegex = /<img.*?src=['"](.*?)['"]/;
        const date = new Date(item.published);
        const imageExists = imgRegex.exec(description);
        return {
          description,
          id: item.id,
          url: item.links[0].url,
          date,
          stringifiedDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          title: item.title,
          image: imageExists
            ? addHttpToUrl(imgRegex.exec(description)![1])
            : errorImage,
        };
      });
    });
  },
});

export default rssSlice.reducer;
