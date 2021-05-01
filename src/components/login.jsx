import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "firebase/app";
import PreLoader from "./common/preLoader";
import { Helmet } from "react-helmet";


class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    user: {},
    submitting: false,
  };

  schema = {
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Email Address"),
  };

  componentDidMount() {
    if(this.props.match.params.urlTo) {
      const from = this.props.match.params.urlTo;
      const id = this.props.match.params.id;
      const prevPath = `/${from}/${id}`;
      
      console.log(prevPath);
      this.setState({prevPath: prevPath})
    }


  }

  doSubmit = () => {
    const { data, prevPath } = this.state;

    const email = data.email.trim();
    const password = data.password.trim();
    let user = {};

    //Launch the preloader while submitting
    const submitting = this.state.submitting;
    this.setState({ submitting: !submitting });

    // Call the server
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.then((data) => {
      // const userId = data.user.uid;

      const submitting = this.state.submitting;
      this.setState({ submitting: !submitting });
      toast.success(`Successfully Signed In. Welcome`);
      // this.props.history.push("/");
      setTimeout(() => {

        window.location = prevPath || "/dashboard";
      }, 2000);

      // console.log("user", user);
    });
    promise.catch((error) => {
      const submitting = this.state.submitting;
      this.setState({ submitting: !submitting });
      var errorMessage = error.message;
      toast.error(errorMessage);
      return;
    });
    this.setState({ user });

    // console.log(typeof user);
  };

  render() {
    const { submitting } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Sign in - Hifz Companion</title>
          <meta
            name="description"
            content="Login to continue memorizing the Quran."
          />
        </Helmet>
        {submitting ? (
          <PreLoader />
        ) : (
          <Container
            component="main"
            maxWidth="sm"
            style={{
              marginTop: "5vh",
              backgroundColor: "#eee",
              padding: "4rem",
              borderRadius: "6px",
            }}
          >
            <CssBaseline />
            <div>
              <Grid justify="center" alignItems="center" item container>
                <Avatar
                  style={{ backgroundColor: "#f50057" }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <br />
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ marginLeft: "10px" }}
                >
                  Sign in
                </Typography>
              </Grid>
              <form onSubmit={this.handleSubmit}>
                {this.renderTextField("email", "Email Address")}
                {this.renderTextField("password", "Password")}

                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                {this.renderSubmitButton("Sign In")}
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password" variant="body2" style={{ color: "blue" }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/sign-up"
                      variant="body2"
                      style={{ color: "blue" }}
                    >
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Login;
