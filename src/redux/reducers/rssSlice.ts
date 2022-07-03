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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  rssListURLs: string[];
  order: RssOrder;
  isAsyncStorageLoading: boolean;
}

const initialState: RssState = {
  rssList: [],
  rssListCopy: [],
  rssListURLs: [],
  order: RssOrder.DESCENDING,
  isAsyncStorageLoading: true,
};

export const errorImage =
  "https://previews.123rf.com/images/rms164/rms1641504/rms164150400011/38672644-vector-error-icon.jpg";

export const fetchRssXML = createAsyncThunk(
  "rss/fetchRssXML",
  async (url: string) => {
    const response = await axios.get(url);
    const imgRegex = /<img.*?src=['"](.*?)['"]/;
    
    const rssDataParsed = await rssParser.parse(response.data);

    // Getting only the data that I need from the response
    const rssListToStorage = rssDataParsed.items.map((item: any) => {
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

    // Checking if there's data in AsyncStorage (rssList)
    let rssListAsyncStorage = await AsyncStorage.getItem("rssList");

    if (!rssListAsyncStorage) {
      // Saving the rssList and rssListIds in case they don't exist
      await Promise.all([
        AsyncStorage.setItem(
          "rssListIds",
          JSON.stringify(rssListToStorage.map((item: any) => item.id))
        ),
        AsyncStorage.setItem("rssList", JSON.stringify(rssListToStorage)),
      ]);
      return rssListToStorage;
    } else {
      let rssListIds = await AsyncStorage.getItem("rssListIds");
      const newRssList: any[] = [];
      const newRssListIds: string[] = [];
      if (rssListIds) rssListIds = JSON.parse(rssListIds);

      rssListAsyncStorage = JSON.parse(rssListAsyncStorage);

      rssListToStorage.forEach((item: any) => {
        if (!rssListIds!.includes(item.id)) {
          newRssList.push(item);
          newRssListIds.push(item.id);
        }
      });

      await Promise.all([
        AsyncStorage.setItem(
          "rssListIds",
          JSON.stringify([...new Set([...rssListIds!, ...newRssListIds])])
        ),
        AsyncStorage.setItem(
          "rssList",
          JSON.stringify([...rssListAsyncStorage!, ...newRssList])
        ),
      ]);
      return [...rssListAsyncStorage!, ...newRssList];
    }
  }
);

export const addNewFeedURL = createAsyncThunk(
  "rss/addNewFeedURL",
  async (newFeed: string) => {
    let asyncStorageFeedURLs = await AsyncStorage.getItem("rssListURLs");

    if (!asyncStorageFeedURLs) {
      // If feedUrls don't exist in local storage then we save the first one
      await AsyncStorage.setItem("rssListURLs", JSON.stringify([newFeed]));

      return [newFeed];
    } else {
      asyncStorageFeedURLs = JSON.parse(asyncStorageFeedURLs);
      // If feedUrls exist in local storage then we save the first one
      if (!asyncStorageFeedURLs!.includes(newFeed)) {
        await AsyncStorage.setItem(
          "rssListURLs",
          JSON.stringify([...asyncStorageFeedURLs!, newFeed])
        );
        return [...asyncStorageFeedURLs!, newFeed];
      }
    }
  }
);

export const deleteFeedURL = createAsyncThunk(
  "rss/deleteFeedURL",
  async (feedUrlToDelete: string) => {
    let asyncStorageFeedURLs = await AsyncStorage.getItem("rssListURLs");

    if (asyncStorageFeedURLs)
      asyncStorageFeedURLs = JSON.parse(asyncStorageFeedURLs);

    if (Array.isArray(asyncStorageFeedURLs)) {
      // @ts-ignore
      const newFeedUrls = asyncStorageFeedURLs.filter(
        (url: string) => url !== feedUrlToDelete
      );

      await AsyncStorage.setItem("rssListURLs", JSON.stringify(newFeedUrls));

      return newFeedUrls;
    }
  }
);

export const loadDataFromAsyncStorage = createAsyncThunk(
  "rss/loadDataFromAsyncStorage",
  async () => {
    let [rssListUrls, rssList] = await Promise.all([
      AsyncStorage.getItem("rssListURLs"),
      AsyncStorage.getItem("rssList"),
    ]);

    if (rssList) rssList = JSON.parse(rssList);
    if (rssListUrls) rssListUrls = JSON.parse(rssListUrls);

    return {
      rssListUrls: rssListUrls ? rssListUrls : [],
      rssList: rssList ? rssList : [],
    };
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
    changeIsAsyncStorageLoading: (state, action: PayloadAction<boolean>) => {
      state.isAsyncStorageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRssXML.fulfilled, (state, action) => {
      state.rssList = action.payload;

      if (state.order === RssOrder.ASCENDING)
        state.rssList.sort(sortInAscendingOrderByDate);

      if (state.order === RssOrder.DESCENDING)
        state.rssList.sort(sortInDescendingOrderByDate);

      state.rssListCopy = [...state.rssList];
    });

    builder.addCase(addNewFeedURL.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) state.rssListURLs = action.payload;
    });
    builder.addCase(deleteFeedURL.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) state.rssListURLs = action.payload;
    });
    builder.addCase(loadDataFromAsyncStorage.fulfilled, (state, action) => {
      state.rssListURLs = action.payload.rssListUrls as string[];
      state.rssList = action.payload.rssList as RssResponse[];
      state.rssListCopy = [...state.rssList];
    });
  },
});

export const { sortRssList, filterByTitle, changeIsAsyncStorageLoading } =
  rssSlice.actions;

export default rssSlice.reducer;
