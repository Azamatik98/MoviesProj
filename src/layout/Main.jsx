import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import Seacrh from "../components/Search";
import Preloader from "../components/Preloader";

const API_KEY = process.env.REACT_APP_API_KEY;

function Main() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchMovies = (str, type = "all") => {
    setLoading(true);
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMovieList(data.Search);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avatar`)
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data.Search);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Seacrh searchMovies={searchMovies} />
      {loading ? <Preloader /> : <MovieList movieList={movieList} />}
    </main>
  );
}

export default Main;
