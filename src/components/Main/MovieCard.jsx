import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFavorite,
  removeFavorites,
} from "../../redux/slices/FavoritesSlice";

export default function MovieCard({ movie }) {
  let navigate = useNavigate();

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

  return (
    <div
      className="flex  w-75 h-160 flex-col p-3 overflow-hidden hover:shadow-lg bg-white rounded-lg shadow-md transition hover:scale-103 duration-200"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        className="rounded-2xl w-80 h-[31rem]"
        src={`${BASE_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="p-4">
        <h1 className="text-[23px] font-semibold text-gray-800 text-center">
          {movie.title}
        </h1>
        <p className="text-gray-600 text-center">
          Rating: {movie.vote_average.toFixed(1)}
        </p>
        <h2 className="text-gray-500 text-center text-sm">
          {movie.release_date}
        </h2>
      </div>
      <button
        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite();
        }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to favorites"}
      </button>
    </div>
  );
}
