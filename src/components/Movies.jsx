import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import Filter from "./common/Filter";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentGenre: "1",
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" }
  };

  getLike(movie) {
    if (movie.liked) {
      return <i className="fa fa-heart" aria-hidden="true" />;
    }
    return <i className="fa fa-heart-o" aria-hidden="true" />;
  }

  sortBy = sortColumn => {
    this.setState({ sortColumn });
  };

  onPageChange = page => {
    this.setState({ currentPage: page });
  };

  onFilterChange = genreId => {
    this.setState({ currentPage: 1, currentGenre: genreId });
  };

  deleteMovie = MovieId => {
    let index = this.state.movies.findIndex(movie => movie._id === MovieId);
    this.state.movies.splice(index, 1);
    let page =
      this.state.movies.length === this.state.pageSize
        ? 1
        : this.state.currentPage;
    this.setState({ movies: this.state.movies, currentPage: page });
  };

  likeButton = MovieId => {
    const movie = this.state.movies.find(movie => movie._id === MovieId);
    movie.liked = !movie.liked;
    this.setState({ movies: this.state.movies });
  };

  getFilteredMovies() {
    let filteredMovies =
      this.state.currentGenre === "1"
        ? this.state.movies
        : this.state.movies.filter(
            m => m.genre._id === this.state.currentGenre
          );
    let oreredMovies = _.orderBy(
      filteredMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    // console.log("oreredMovies", oreredMovies);

    let { length: count } = filteredMovies;
    const movies = paginate(
      [...oreredMovies],
      this.state.currentPage,
      this.state.pageSize
    );
    const result = { movies, count };
    return result;
  }

  render() {
    const genres = getGenres();

    genres.push({ _id: "1", name: "All Genres" });

    const { movies, count } = this.getFilteredMovies();

    if (this.state.movies.length === 0) {
      return <p>There are no Movies Yet!!!</p>;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Filter
              filterItems={genres}
              currentItem={this.state.currentGenre}
              onFilterChange={this.onFilterChange}
            />
          </div>
          <div className="col">
            <p>There are {count} movies in the database.</p>
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              deleteMovie={this.deleteMovie}
              likeButton={this.likeButton}
              sortBy={this.sortBy}
            />
            <Pagination
              itemsCount={count}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.onPageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
