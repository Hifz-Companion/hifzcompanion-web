import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import SignUp from './components/signUp';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Plans from './components/plans';
import Contact from './components/contact';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function App() {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" newestOnTop />
      <NavBar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/plans" exact component={Plans} />
        <Route path="/contact" exact component={Contact} />

        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
