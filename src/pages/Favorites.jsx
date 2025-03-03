import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/Main/MovieCard";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="bg-gray-50 font-google h-fit">
      <h2 className="text-center py-6 font-bold text-3xl text-gray-800">
        FAVORITES
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 grid-rows-4 lg:grid-rows-3 px-4 gap-6 lg:px-6 py-8 place-items-center">
        {favorites.length ? (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="w-75 h-160">Nothing in favorites</div>
        )}
      </div>
    </div>
  );
}
