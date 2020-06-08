// React
import React from "react";

// MUI
import ButtonMUI from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

// Atoms
import Icon from "Components/atoms/UI/Icon"

// Router
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: 'none',
    padding: 0,
    fontSize: '13px',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
}));

const Button = props => {
  const classes = useStyles();
  const history = useHistory();

  const { label, onClick, color, goTo, fullWidth, type, icon, size } = props;

  return (
    <ButtonMUI
      onClick={goTo ? () => history.push(goTo) : onClick}   
      fullWidth={fullWidth}
      color={color}
      type={type}
      className={classes.root}
      style={{ fontSize: size }}
      disableElevation
    >
      {icon && <Box mr={1} display="flex" alignItems="center"><Icon icon={icon} size={size || '14px'}></Icon></Box>}
      <Box>
        {label}
      </Box>
    </ButtonMUI>
  );
};

Button.defaultProps = {
  label: "Label",
  color: 'primary',
  onClick: () => console.log("Ouch!"),
  goTo: "",
  fullWidth: false,
  type: "button"
};

export default Button;
