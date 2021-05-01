import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const TextInputField = ({ error, ...rest }) => {
  return (
    <div>
      <TextField {...rest} margin="normal" />
      {error && (
        <Typography color="secondary" component="p" variant="subtitle1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TextInputField;
