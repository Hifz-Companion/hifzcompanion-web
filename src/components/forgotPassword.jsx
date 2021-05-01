import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "firebase/app";
import PreLoader from "./common/preLoader";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

class ForgotPassword extends Form {
    state = { 
        data: { email: "" },
        errors: {},
        user: {},
        submitting: false,
        signInNow: false,
     }

     schema = {
        email: Joi.string().required().label("Email Address"),
      };

    doSubmit = () => {
        console.log("email sent");

        const { email } = this.state.data;
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            toast.success("Password Reset Email has been sent.")
            this.setState({data: { email: ""}, signInNow: true})
        })
        .catch(error => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        })
    }


    render() { 
        const classes = useStyles;
        const { submitting, signInNow } = this.state;  

        return ( 
        <React.Fragment>
            <Helmet>
          <title>Forgot Password - Acabest</title>
          <meta
            name="description"
            content="Enter your email to recover your password."
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
            <div className={classes.paper}>
              <Grid justify="center" alignItems="center" item container>
                <br />
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ marginLeft: "10px" }}
                >
                  Reset Password
                </Typography>
              </Grid>
              <Typography
                  component="p"
                  variant="caption"
                  style={{ marginLeft: "10px", display: "flex" }}
                >
                  We will send you an Email with a link to reset your password.
                  Check your Spam, Promotion and other mail folders if you don't find it in inbox.
                </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                {this.renderTextField("email", "Email Address")}

                {this.renderSubmitButton("Submit")}
              </form>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                id="continue-btn"
                disabled={!signInNow}
                style={{ marginTop: "10px"}}
                component={Link}
                to="/login"
              >
                Sign In Now
              </Button>
            </div>
          </Container>
        )}
        </React.Fragment> );
    }
}
 
export default ForgotPassword;