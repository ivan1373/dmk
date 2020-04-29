// React
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getData as getRoles } from "Modules/units/Roles";
import { getData as getStates} from "Modules/units/States";
import { getData as getPrivileges } from "Modules/units/Privileges";
import { getData as getPermissions} from "Modules/units/Permissions";
import { getData as getCities } from "Modules/units/Cities";
import { getData as getDistricts} from "Modules/units/Districts";
import { useHistory, useLocation } from "react-router-dom";
// MUI
import Box from "@material-ui/core/Box";

// Atoms
import Title from 'Components/atoms/UI/Title'

// Molecules
import Table from "Components/molecules/Table"

const DataTable = ({title, selector, model}) => {
  const dispatch = useDispatch();

  const tableData = useSelector(state => state.users);

   switch(selector) {
    case 'role':
      
      break;
    case 'state':
      useEffect(() => {
        dispatch(getStates(selector))
      }, [])
      break;
    /* case 'privilege':
      useEffect(() => {
        dispatch(getPrivileges(selector))
      }, [])
      break;
    case 'permission':
      useEffect(() => {
        dispatch(getPermissions(selector))
      }, [])
      break; */
    
    case 'district':
      useEffect(() => {
        dispatch(getDistricts(selector))
      }, [])
      break;
    
  } 
  
  

  /*useEffect(() => {
    
  }, []);*/
  /*if(roles.data)
  console.log(Object.keys(roles.data[0]).filter(value => !["id", "status", "created_at", "updated_at"].includes(value)))*/
  return (
    <>
      <Box mb={7}>
        <Title 
          variant="h4" 
          align={'left'} 
          title={title}
        />
      </Box>
      <Table data={tableData} model={model}></Table>
    </>
  );
};

export default DataTable;
