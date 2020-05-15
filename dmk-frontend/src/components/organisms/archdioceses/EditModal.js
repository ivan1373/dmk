import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MUIButton from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

// Molecules
import InputForm from "Components/molecules/InputForm"

// Atoms
import Button from "Components/atoms/buttons/Button";
import Title from "Components/atoms/UI/Title";

// Actions
import { putData, postData } from "Modules/units/Archdioceses";

// Models
import { EditForm } from 'Pages/archdioceses/model/archdiocese'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 5, 4),
  },
  button: {
    height: '56px',
    fontSize: '18px',
    borderRadius: '7px',
    textTransform: 'none'
  },
}));

const EditModal = ({ onOpen, closeModal, item, itemId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(EditForm);
  const [submitted, setSubmitted] = useState(false)
  const errorMsg = useSelector(state => state.archdioceses.editErrorMsg);

  const func = () => {
    let clearVal = inputs.filter(input => {
      input.value = '';
      input.validation = '';
      input.error = false;
      return input;
    })
    
    setInputs(clearVal)
  }

  useEffect(() => {
    if(submitted){
      if(errorMsg.errorCode === 200){
        console.log(errorMsg.errorCode)
        closeModal();
      
      setSubmitted(false)
    }
    else if(errorMsg.errorCode === 400){
      if(typeof errorMsg.description === 'object'){
        inputs.forEach(input => {
          Object.keys(errorMsg.description).forEach(desc => {
            if(input.name_in_db === desc){
              input.validation = errorMsg.description[desc][0];
              input.error = true;
            }
          })
        })
      }
      console.log(errorMsg)
      setSubmitted(false)
    }
    else {
      NotificationManager.error(errorMsg.description);
      setSubmitted(false)
    }}
  }, [errorMsg])

  const editItem = (e) => {
    e.preventDefault();

    const body = {};

    inputs.forEach(input => {
      body[input.name_in_db] = input.value;
    })
    setSubmitted(true)
    dispatch(putData(`archdiocese/${itemId}`, body));
  }

  useEffect(() => {
    inputs.forEach((input, index) => {
      input.value = item[index]
    })
  }, [item]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={onOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={onOpen}>
          <Container className={classes.paper} maxWidth="xs">
            <Box display="flex" flexDirection="column" p={2}>
              <Box mb={3}>
                <Title
                  variant="h5"
                  align={'left'}
                  title={'Uredi biskupiju'}
                />
              </Box>
              <form>
                <InputForm inputs={inputs} setInputs={setInputs}></InputForm>
                <Box pt={3} display="flex" justifyContent="flex-start">
                  <Box pr={1}>
                    <Button
                      label="Potvrdi"
                      onClick={editItem}
                    />
                  </Box>
                  <Box>
                    <MUIButton
                      variant="contained"
                      disableElevation
                      onClick={() => {closeModal(), func()}}
                      className={classes.button}
                    >Otkaži</MUIButton>
                  </Box>
                </Box>
              </form>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModal;