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
    // const { user } = this.state;
    return (
      <React.Fragment>
        <footer id="footer">
          <Grid container>
            <Grid item xs={6} sm={6} md={4}>
              <a href="/privacy-policy">Privacy Policy</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="/terms">Terms of Use</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="/questionbank">Question Bank</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="/osce">OSCE</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="about">About Us</a>
            </Grid>
            <br /><br />
            <Grid item xs={6} sm={6} md={4}>
              <a href="contact">Contact Us</a>
            </Grid>
          </Grid>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
