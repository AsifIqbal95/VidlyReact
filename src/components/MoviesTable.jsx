import React, { Component } from "react";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.likeButton(movie._id)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.deleteMovie(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, sortBy } = this.props;
    return (
      <React.Fragment>
        <table className="table">
          <TableHeader
            sortColumn={sortColumn}
            sortBy={sortBy}
            columns={this.columns}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
