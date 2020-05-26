import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Molecules
import ButtonWithIcon from "Components/molecules/ButtonWithIcon";
import CustomFooter from "Components/molecules/CustomFooter";
import CustomSearch from "Components/molecules/CustomSearch";

// MUI
import MUIDataTable from "mui-datatables";
import { Box } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';

// Organisms
import EditModal from 'Components/organisms/districts/EditModal'
import DeactivateModal from 'Components/organisms/districts/DeactivateModal'
import ActivateModal from 'Components/organisms/districts/ActivateModal'

// Actions
import { getData, getOneItem, searchData } from "Modules/units/Districts";

const Table = () => {
  const [open, setOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0)
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const tableData = useSelector(state => state.districts);

  const getItem = async id => {
    dispatch(getOneItem(`district/${id}`))
    setTimeout(() => setOpen(true), 500)
  };

  const columns = [
    {
      label: 'Naziv župe',
      name: 'name',
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      label: 'Adresa',
      name: 'address',
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      label: 'Grad',
      name: 'city.name',
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      label: 'Biskupija',
      name: 'archdiocese.name',
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      label: 'Aktivnost',
      name: 'status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {(value === 1)
                ? <Chip label="Aktivan" color="primary" />
                : <Chip label="Neaktivan" disabled />
              }
            </div>
          );
        }
      }
    },
    {
      name: "id",
      label: "Akcije",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <Box display="flex">
                <Box mr={3}>
                  <ButtonWithIcon
                    label={'Uredi'}
                    icon={"edit"}
                    onClick={() => { setItemId(value); getItem(value); }}
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
                        onClick={() => { setDeactivateOpen(true); setItemId(value) }}
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
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    getSearchData(searchVal)
   }
  }, [searchVal])

  useEffect(() => {
    changePage(page, rows);
  }, [page, rows])

  const changePage = (page, rows) => {
    dispatch(getData(`district?start=${page + 1}&limit=${rows}`))
  };

  const getSearchData = async value => {
    const body = {
      search: value
    };

    dispatch(searchData('district/search', body))
  };

  const options = {
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: null,
    filter: false,
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
          setSearchVal(tableState.searchText)
          break;
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setRows(tableState.rowsPerPage);
          break;
      }
    },
  }

  return (
    <>
      {tableData.data &&
        <MUIDataTable
          title={'Popis župa'}
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

      <DeactivateModal
        onDeactivate={deactivateOpen}
        closeDeactivate={() => setDeactivateOpen(false)}
        itemId={itemId}
      ></DeactivateModal>

      <ActivateModal
        onActivate={activateOpen}
        closeActivate={() => setActivateOpen(false)}
        itemId={itemId}
      ></ActivateModal>
    </>
  );
}

export default Table;