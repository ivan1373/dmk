// React
import React from 'react';

// MUI
import Box from "@material-ui/core/Box";

// Atoms
import Title from 'Components/atoms/UI/Title'

// Molecules
import Table from "Components/organisms/privileges/Table"

const DataTable = () => {
  return (
    <>
      <Box mb={7}>
        <Title 
          variant="h4" 
          align={'left'} 
          title={'Popis privilegija'}
        />
      </Box>
      <Table></Table>
    </>
  );
};

export default DataTable;