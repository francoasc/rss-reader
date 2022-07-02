import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { addHttpToUrl } from "../../utils/strings";
// No TypeScript support for rssParser package
// @ts-ignore
import * as rssParser from "react-native-rss-parser";
import {
  sortInAscendingOrderByDate,
  sortInDescendingOrderByDate,
} from "../../utils/dates";

export interface RssResponse {
  title: string;
  description: string;
  image: string;
  date: Date;
  stringifiedDate: string;
  url: string;
  id: string;
}

export enum RssOrder {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export interface RssState {
  rssList: RssResponse[];
  rssListCopy: RssResponse[];
  order: RssOrder;
}

const initialState: RssState = {
  rssList: [],
  rssListCopy: [],
  order: RssOrder.DESCENDING,
};

export const errorImage =
  "https://previews.123rf.com/images/rms164/rms1641504/rms164150400011/38672644-vector-error-icon.jpg";

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
  reducers: {
    sortRssList: (state, action: PayloadAction<string>) => {
      state.order =
        action.payload === RssOrder.ASCENDING
          ? RssOrder.DESCENDING
          : RssOrder.ASCENDING;

      if (state.order === RssOrder.ASCENDING)
        state.rssListCopy.sort(sortInAscendingOrderByDate);

      if (state.order === RssOrder.DESCENDING)
        state.rssListCopy.sort(sortInDescendingOrderByDate);
    },
    filterByTitle: (state, action: PayloadAction<string>) => {
      const titleToSearch = action.payload.toLowerCase();

      // Filling the array if no search input
      if (action.payload === "") state.rssListCopy = [...state.rssList];
      else {
        state.rssListCopy = state.rssList.filter((rss) =>
          rss.title.toLowerCase().includes(titleToSearch)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRssXML.fulfilled, (state, action) => {
      const imgRegex = /<img.*?src=['"](.*?)['"]/;

      state.rssList = action.payload.items.map((item: any) => {
        const description = item.description
          ? item.description.trim()
          : item.content;
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

      if (state.order === RssOrder.ASCENDING)
        state.rssList.sort(sortInAscendingOrderByDate);

      if (state.order === RssOrder.DESCENDING)
        state.rssList.sort(sortInDescendingOrderByDate);

      state.rssListCopy = [...state.rssList];
    });
  },
});

export const { sortRssList, filterByTitle } = rssSlice.actions;

export default rssSlice.reducer;
