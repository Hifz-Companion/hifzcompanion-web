import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "././components/scrollToTop";
import firebase from "firebase/app";
import './index.css';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const firebaseConfig = {
  apiKey: "AIzaSyAW9m5TXpA6myCvK6GjbtW3MzbkLD1LQk0",
  authDomain: "acabest-97947.firebaseapp.com",
  databaseURL: "https://acabest-97947.firebaseio.com",
  projectId: "acabest-97947",
  storageBucket: "acabest-97947.appspot.com",
  messagingSenderId: "1018618035149",
  appId: "1:1018618035149:web:6c14b5e11d7a594eb4e284"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log("user id", user.uid);
    const userId = user.uid;
    const docRef = firebase.firestore().collection("users").doc(userId);

    docRef
      .get()
      .then((doc) => {
        console.log(doc.data())
        if(doc.data() === undefined){
          localStorage.setItem("currentUser", JSON.stringify({}));
        } else {
          localStorage.setItem("currentUser", JSON.stringify(doc.data()));
        }
        localStorage.setItem("currentUserId", userId);
      })
      .catch((error) => {
        console.log("error getting document", error);
      });
    // ...
  } else {
    // User is signed out.
    // console.log("user signed out");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
  }
});

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
