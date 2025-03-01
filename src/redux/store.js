import { configureStore } from "@reduxjs/toolkit";
import FavoritesReducer from "./slices/FavoritesSlice";
import { movieApi } from "../services/movieApi";

export const store = configureStore({
  reducer: {
    favorites: FavoritesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});
