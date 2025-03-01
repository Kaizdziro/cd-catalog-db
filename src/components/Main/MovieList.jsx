import React from "react";
import MovieCard from "./MovieCard";
import { useGetPopularMoviesQuery } from "../../services/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import RightArrow from "../../assets/right-arrow.png";
import LeftArrow from "../../assets/left-arrow.png";

export default function MovieList() {
  let { queryId } = useParams();
  let currentPage = Number(queryId) || 1;

  const { data, isLoading } = useGetPopularMoviesQuery(currentPage);
  let navigate = useNavigate();

  if (isLoading) return <p className="bg-indigo-100 font-google">Loading...</p>;
  return (
    <div className="bg-gray-50 font-google">
      <h2 className="text-center py-6 font-bold text-3xl text-gray-800">
        TOP MOVIES
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-rows-4 lg:grid-rows-3 px-4 gap-6 lg:px-6 py-8 place-items-center">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center py-5 mt-10 gap-14 text-2xl">
        <button
          className="w-5 hover:scale-120 transition-transform duration-200 "
          onClick={() => navigate(`/${Math.max(1, currentPage - 1)}`)}
        >
          <img src={LeftArrow} alt="" />
        </button>
        <p>{currentPage}</p>
        <button
          className="w-5  hover:scale-120 transition-transform duration-200 "
          onClick={() => navigate(`/${currentPage + 1}`)}
        >
          <img src={RightArrow} alt="" />
        </button>
      </div>
    </div>
  );
}
