// React
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from '@material-ui/core/OutlinedInput';


// Services
import { getFunc } from "../../../services/mainApiServices";

const useStyles = makeStyles(theme => ({
  input: {
    color: `${theme.palette.secondary.main} !important`,
    marginTop: '16px'
  }
}));

const methods = {
  data: [
    {
      id: "GET",
      name: "GET"
    },
    {
      id: "POST",
      name: "POST"
    },
    {
      id: "PUT",
      name: "PUT"
    },
    {
      id: "DELETE",
      name: "DELETE"
    }]
}

const Dropdown = props => {

  const classes = useStyles();

  const {
    value,
    label,
    validation,
    required,
    service,
    setParentState,
    error,
    charsToTrigger,
    disabled
  } = props;

  console.log(props)

  const [item, setItem] = useState(value ? value : '');
  const [options, setOptions] = useState([]);
  

  useEffect(() => {
    if (service !== 'methods') {
      getFunc(service).then(data => {
        setOptions(data)
      })
    }
    else {
      setOptions(methods)
    }
  }, [])

  
  useEffect(() => {
    if (service !== 'methods')
      setParentState({
        id: item
      })
    else
      setParentState(item)

  }, [item])

  const handleChange = event => {
    setItem(event.target.value);
  };

  return (
    <>
      {options.data &&
      <FormControl fullWidth error={error}>
        <Select
          displayEmpty
          variant="outlined"
          
          value={item}
          onChange={handleChange}
          className={classes.input}
          input={<OutlinedInput
            required={required}
            error={error}
          />}
        >
          <MenuItem disabled value="">
            {label}
          </MenuItem>
          {options.data.map(name => (
            <MenuItem
              key={name.id}
              value={name.id}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
        {error &&
        <FormHelperText>{validation}</FormHelperText>}
        </FormControl>
      }
    </>
  )
}

/*Dropdown.defaultProps = {
    autoWidth = false,
    displayEmpty = true
  };*/

export default Dropdown