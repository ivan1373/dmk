// React
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// MUI
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// Atoms
import Button from "Components/atoms/buttons/Button";
import Title from "Components/atoms/UI/Title";

// Molecules
import InputForm from "Components/molecules/InputForm"

// Model
import { RoleForm } from 'Pages/roles/model/role'

// Organisms
import EditModal from 'Components/organisms/roles/EditModal'

// Action
import { postData } from "Modules/units/Roles";
import { clearValidation } from "Modules/units/Validation";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: '#dcdeef',
    padding: '8px 8px 8px 24px'
  }
}));

const AddForm = ({open, setOpen}) => {
  const [inputs, setInputs] = useState(RoleForm);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [item, setItem] = useState([]);

  const validation = useSelector(state => state.validation);

  useEffect(() => {
    clearInputs()
    dispatch(clearValidation())
  }, [])

  const clearInputs = () => {
    setInputs(inputs.map(input => ({
      label: input.label,
      type: input.type,
      disabled: false,
      name_in_db: input.name_in_db,
      validation: null,
      error: false,
      value: ""
    })));
  }

  const addItem = e => {
    e.preventDefault();

    dispatch(clearValidation())
    const body = {};
    const arr = []

    inputs.forEach(input => {
      body[input.name_in_db] = input.value;
      arr.push(input.value)
    })

    setItem(arr)
    dispatch(postData(`role`, body, clearInputs, setOpen));
  };

  const closeModal = () => {
    setOpen(false);
    setItem([]);
  }

  return (
    <>
      <Box>
        <Box className={classes.title}>
          <Title
            variant="h6"
            align={'left'}
            title={'Dodavanje role'}
          />
        </Box>
        <Box mx={3} mt={1}>
          <form>
            <InputForm inputs={inputs} setInputs={setInputs} cols={4} spacing={2} validation={open ? null : validation}></InputForm>
            <Box mt={2}>
              <Button
                label="+ Dodaj rolu"
                onClick={addItem}
              />
            </Box>
          </form>
        </Box>
      </Box>

      <EditModal
        onOpen={open}
        closeModal={closeModal}
        item={item}
      ></EditModal>
    </>
  );
};

export default AddForm;
