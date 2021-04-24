import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Footer extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const user = localStorage.getItem("currentUser");
    this.setState({user})
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <footer id="footer">
          <Grid container>
            <Grid item xs={6} sm={6} md={4}>
              <a href="/contact">Contact</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="/plans">Memorization Plans</a>
            </Grid>
            <br /><br />
            {!user && <Grid item xs={6} sm={6} md={4}>
              <a href="/sign-up">Create Account</a>
            </Grid>}
            <br /><br />
            {!user && <Grid item xs={6} sm={6} md={4}>
              <a href="/login">Login</a>
            </Grid>}
          </Grid>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
