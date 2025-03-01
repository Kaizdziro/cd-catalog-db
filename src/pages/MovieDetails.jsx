import React from "react";
import { useParams } from "react-router";
import { useGetMovieDetailsQuery } from "../services/movieApi";
import { useDispatch, useSelector } from "react-redux";

import { addFavorite, removeFavorites } from "../redux/slices/FavoritesSlice";

export default function MovieDetails() {
  let { id } = useParams();
  let { data: movie, isLoading, error } = useGetMovieDetailsQuery(id);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie?.id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorites(movie.id));
      console.log("Movie removed");
    } else {
      dispatch(addFavorite(movie));
      console.log("Movie added");
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  if (isLoading) return <p className="bg-indigo-400 h-dvh">Loading...</p>;
  if (error) return <p>Error! Check the console...</p>;
  if (!movie) return <p>Nothing found!</p>;

  return (
    <div className="bg-gray-50 min-h-screen font-google">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 lg:max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              className="w-full h-auto rounedd-lg shadow-md hover:shadow-lg transition-shadow duration-200 "
              src={`${BASE_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 lg:text-center lg:flex-col lg:self-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {movie.title}
            </h1>
            <h2 className=" text-xl font-semibold text-gray-600 mb-2">
              Storyline:
            </h2>
            <p className="text-gray-700 mb-6">{movie.overview}</p>
            <h2 className="text-gray-600 mb-2">
              Realese date: {movie.release_date}
            </h2>
            <p className="text-gray-600 mb-6">
              Vote average: {movie.vote_average.toFixed(1)}
            </p>

            <button
              className="px-4 py-2  bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200"
              onClick={(e) => e.stopPropagation(handleFavorite())}
            >
              {isFavorite ? "Remove from Favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
