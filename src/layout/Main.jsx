import React from "react";
import MovieList from "../components/MovieList";
import Seacrh from "../components/Search";
import Preloader from "../components/Preloader";

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
  state = {
    movieList: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avatar`)
      .then((response) => response.json())
      .then((data) => this.setState({ movieList: data.Search, loading: false }))
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  searchMovies = (str, type = "all") => {
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movieList: data.Search, loading: false }))
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { movieList, loading } = this.state;

    return (
      <main className="container content">
        <Seacrh searchMovies={this.searchMovies} />
        {loading ? <Preloader /> : <MovieList movieList={movieList} />}
      </main>
    );
  }
}

export default Main;
