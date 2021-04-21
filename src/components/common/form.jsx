import React, { Component } from "react";
import Joi from "joi-browser";
import TextInputField from "./textInputField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

class Form extends Component {
  state = {
    data: {},
    errors: {},
    file: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleFileInput = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    const file = input.files[0];

    this.setState({ data, errors, file });
  };

  renderTextField(name, label, autoFocus) {
    const { data, errors } = this.state;

    return (
      <TextInputField
        variant="outlined"
        margin="normal"
        fullWidth
        autoFocus={autoFocus}
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={name}
      />
    );
  }

  renderConfirmPassword(name, label, autoFocus) {
    const { data, errors } = this.state;

    return (
      <TextInputField
        variant="outlined"
        margin="normal"
        fullWidth
        autoFocus={autoFocus}
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type="password"
      />
    );
  }
  
  // renderMobileNumber(name, label, autoFocus) {
  //   const { data, errors } = this.state;

  //   return (
  //     <PhoneInput
  //       variant="outlined"
  //       margin="normal"
  //       fullWidth
  //       autoFocus={autoFocus}
  //       id={name}
  //       label={label}
  //       name={name}
  //       autoComplete={name}
  //       value={data[name]}
  //       onChange={this.handleChange}
  //       error={errors[name]}
  //       type={name}
  //     />
  //   );
  // }
  

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    const classes = useStyles;

    return (
      <FormControl
        style={{ width: "100%", margin: "12px 0px" }}
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel htmlFor={options[0].id}>{label}</InputLabel>
        <Select
          native
          value={data[name]}
          onChange={this.handleChange}
          error={errors[name]}
          input={<OutlinedInput name={name} id={options[0].id} />}
        >
          <option value="" />
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }
  renderSubmitButton(label) {
    const classes = useStyles;

    return (
      <Button
        disabled={Boolean(this.validate())}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        id="submit-btn"
      >
        {label}
      </Button>
    );
  }

  renderFileInput(name, label, file) {
    const { data, errors } = this.state;
    return (
      <div style={{ margin: "20px 0 20px 0" }}>
        <Button
          style={{
            color: "white",
            width: "100%",
            backgroundColor: "rgba(245, 0, 87, 7)"
          }}
        >
          <input
            type="file"
            id={name}
            name={name}
            value={data[name]}
            error={errors[name]}
            accept=".jpg, .jpeg, .png"
            onChange={this.handleFileInput}
          />
        </Button>
      </div>
    );
  }
}

export default Form;
