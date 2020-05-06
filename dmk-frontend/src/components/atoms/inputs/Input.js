// React
import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  input:{
      color: `${theme.palette.secondary.main} !important`
  }
}));

const Input = props => {

  const classes = useStyles();

  const {
    type,
    value,
    label,
    validation,
    onChange,
    required,
    disabled,
    color
  } = props;

  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      disabled={disabled}
      type={type}
      label={label}
      value={value}
      color={color}
      required={required}
      error={validation.error}
      helperText={validation.text}
      onChange={e => onChange(e.currentTarget.value)}
      className={classes.root}
      InputProps={{
        classes: {
          root: classes.input,
        },
      }}
    />
  );
};

Input.defaultProps = {
  label: "Label",
  type: "text",
  value: "",
  error: false,
  helperText: "",
  required: false,
  disabled: false,
  color: "primary",
};

export default Input;
