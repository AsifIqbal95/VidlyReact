import React, { Component } from "react";

class Login extends Component {
  state = { account: { username: "", password: "" } };
  onLogin = e => {
    e.preventDefault();
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onLogin}>
          <div className="form-group">
            <label htmlFor="username">User name</label>
            <input
              autoFocus
              name="username"
              type="text"
              id="username"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
