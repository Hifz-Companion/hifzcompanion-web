import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import PreLoader from "./common/preLoader";
import { Helmet } from "react-helmet";

class SignUp extends Form {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
    submitting: false,
  };

  schema = {
    password: Joi.string()
      .min(6)
      .regex(/^[a-zA-Z0-9]{3,30}$/).label("Password"),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }).label("Confirm Password"),
    access_token: [Joi.string(), Joi.number()],
    email: Joi.string().email({ minDomainAtoms: 2 }).label("Email Address"),
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
    const registrationDate = Date.now();

    //Launch the preloader while submitting
    const submitting = this.state.submitting;
    this.setState({ submitting: !submitting });

    const promise = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    promise.then((data) => {
      const userId = data.user.uid;
      firebase
        .firestore()
        .collection(`users`)
        .doc(userId)
        .set({
          email: email,
          registrationDate: registrationDate,
        })
        .then(() => {
          //Remove the preloader when submitting is done
          const submitting = this.state.submitting;
          this.setState({ submitting: !submitting });
          toast.success("Successfully Signed Up, Welcome!");
          setTimeout(() => {
            window.location = prevPath || "/home";
          }, 2000);
        });
    });
    promise.catch((error) => {
      //Remove the preloader when submitting is done
      const submitting = this.state.submitting;
      this.setState({ submitting: !submitting });
      var errorMessage = error.message;
      console.log(errorMessage);
      toast.error(errorMessage);
      return;
    });
  };


  render() {
    const { submitting } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Sign Up - HifzulQuran</title>
          <meta
            name="description"
            content="Sign up and get started on your journey to memorising the Quran"
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
                  Create an Account
                </Typography>
              </Grid>
              <form onSubmit={this.handleSubmit}>
                {this.renderTextField("email", "Email Address")}
                {this.renderTextField("password", "Password")}
                {this.renderConfirmPassword("confirmPassword", "Confirm Password")}
                {/* <Typography variant="caption">
                  By registering, you confirm that you have read our <a href="/privacy-policy" style={{ color: "blue"}}>Privacy Policy</a> and agree to the <a href="/terms" style={{ color: "blue"}}>Terms of Use</a>
                </Typography> */}
                {this.renderSubmitButton("Sign Up")}
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2" style={{ color: "blue" }}>
                      {"Already have an account? Sign In"}
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

export default SignUp;
