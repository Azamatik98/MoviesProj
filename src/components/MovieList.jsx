import Movie from "./Movie";

function MovieList(props) {
  const { movieList = [] } = props;

  return (
    <div className="movies">
      {movieList.length ? (
        movieList.map((movie) => {
          return <Movie key={movie.imdbID} {...movie} />;
        })
      ) : (
        <h3>Nothing Found</h3>
      )}
    </div>
  );
}

export default MovieList;
