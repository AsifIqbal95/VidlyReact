import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };
  render() {
    let { length: count } = this.state.movies;

    if (count === 0) {
      return <p>There are no Movies Yet!!!</p>;
    }
    return (
      <React.Fragment>
        <p>There are {count} movies in the database.</p>
        {this.state.movies.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.deleteMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }

  deleteMovie = MovieId => {
    let index = this.state.movies.findIndex(movie => movie._id === MovieId);
    this.state.movies.splice(index, 1);
    this.setState({ movies: this.state.movies });
  };
}

export default Movies;
