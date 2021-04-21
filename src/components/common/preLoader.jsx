import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Typography } from "@material-ui/core";

class PreLoader extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="pre-loader">
          <Loader
            type="Bars"
            color="#f50057"
            height={45}
            width={90}
            id="loader"

            // timeout={3000} //3 secs
          />
          <Typography variant="caption" style={{ width: "100px" }}>
            If this takes too long, please check your network and reload!
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default PreLoader;
