import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getData as getRoles } from "Modules/units/Roles";
import { getData as getStates} from "Modules/units/States";
import { getData as getPrivileges } from "Modules/units/Privileges";
import { getData as getPermissions} from "Modules/units/Permissions";
import { getData as getCities } from "Modules/units/Cities";
import { getData as getDistricts} from "Modules/units/Districts";
import { getData as getUsers} from "Modules/units/Users";

import { useHistory, useLocation } from "react-router-dom";

// Molecules
import ButtonWithIcon from "Components/molecules/ButtonWithIcon";
import CustomFooter from "Components/molecules/CustomFooter";
import CustomSearch from "Components/molecules/CustomSearch";

// MUI
import MUIDataTable from "mui-datatables";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Divider } from '@material-ui/core';

// Organisms
import EditModal from 'Components/organisms/EditModal'
import DeleteModal from 'Components/organisms/DeleteModal'
import ActivateModal from 'Components/organisms/ActivateModal'

import { postFunc } from "Services/mainApiServices";

const Table = ({ data, model }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)
  let tableData = useSelector(state => state.roles);

  const dispatch = useDispatch();

  const columns = [
    ...model,
    {
      name: "id",
      label: "Akcije",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <Box display="flex">
                <Box mr={3}>
                  <ButtonWithIcon
                    label={'Uredi'}
                    icon={"edit"}
                    onClick={() => { setOpen(true); setItemId(value); setItem(tableMeta.rowData) }}
                  />
                </Box>
                <div>
                  {(tableMeta.rowData[tableMeta.rowData.length - 2] === 0)
                    ? <Box mr={3}>
                        <ButtonWithIcon
                          label={'Aktiviraj'}
                          icon={"visibility"}
                          onClick={() => { setActivateOpen(true); setItemId(value) }}
                        />
                      </Box>
                    : <Box>
                        <ButtonWithIcon
                          label={'Deaktiviraj'}
                          icon={"visibility_off"}
                          onClick={() => { setDeleteOpen(true); setItemId(value) }}
                        />
                      </Box>
                  }
                </div>
              </Box>
            </div>
          );
        }
      }
    }
  ]

  useEffect(() => {
    if(searchVal){
      if(searchVal.length > 2){
        getSearchData(searchVal)
      }
    }
  }, [searchVal])

  useEffect(() => {
    changePage(page, rows);
  }, [page, rows])
  
  const changePage = (page, rows) => {
    switch(location.pathname){
      case '/role':
        dispatch(getRoles(`role?start=${page+1}&limit=${rows}`))
        break;
      case '/prava':
        dispatch(getPermissions(`permission?start=${page+1}&limit=${rows}`))
        break;
      case '/privilegije':
        dispatch(getPrivileges(`privilege?start=${page+1}&limit=${rows}`))
        break;
      case '/gradovi':
        dispatch(getCities(`city?start=${page+1}&limit=${rows}`))
        break;
      case '/župe':
        dispatch(getDistricts(`district?start=${page+1}&limit=${rows}`))
        break;
      case '/korisnici':
        dispatch(getUsers(`user?start=${page+1}&limit=${rows}`))
        break;
      default:
        console.log('ne radi')
    }
    
  };

  const getSearchData = async value => {
    const body = {
      search: value
    };
    
    const response = await postFunc('role/autocomplete', body)
    tableData.data = response.data
    console.log(tableData)
  };
  
  const options = {
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: null,
    searchOpen: true,
    serverSide: true,
    count: tableData.total,
    selectableRows: 'none',
    rowsPerPage: rows,
    page: page,
    searchText: searchVal,
    customSearchRender: (searchText, handleSearch, hideSearch, options) => {
      return (
        <CustomSearch
          searchText={searchText}
          onSearch={handleSearch}
          onHide={hideSearch}
          options={options}
        />
      );
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      return (
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels} />
      );
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'search':
          //console.log(tableState.searchText)
          setSearchVal(tableState.searchText)
          //getSearchData(tableState.searchText)
          break;
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setRows(tableState.rowsPerPage);
          //changePage(tableState.page, tableState.rowsPerPage);
          break;
      }
    },
  }
  
  return (
    <>
      {tableData.data &&
        <MUIDataTable
          title={''}
          data={tableData.data}
          columns={columns}
          options={options}
        />}
      <EditModal
        onOpen={open}
        closeModal={() => setOpen(false)}
        item={item}
        itemId={itemId}
      ></EditModal>

      <DeleteModal
        onDelete={deleteOpen}
        closeDelete={() => setDeleteOpen(false)}
        itemId={itemId}
      ></DeleteModal>

      <ActivateModal
        onActivate={activateOpen}
        closeActivate={() => setActivateOpen(false)}
        itemId={itemId}
      ></ActivateModal>
    </>

  );
}

export default Table;