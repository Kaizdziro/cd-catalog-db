import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page = 1) =>
        `/movie/popular?api_key=e76c5fe5a2716cb3b6aac211b5e580e6&page=${page}`,
      providesTags: ["Movies"],
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=e76c5fe5a2716cb3b6aac211b5e580e6`,
      invalidatesTags: ["Movies"],
    }),
    searchMovies: builder.query({
      query: (query) =>
        `/search/movie?api_key=e76c5fe5a2716cb3b6aac211b5e580e6&query=${query}`,
      invalidatesTags: ["Movies"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
} = movieApi;
