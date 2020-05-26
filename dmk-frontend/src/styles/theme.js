// MUI
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  palette: {
    background: {
      default: "#f1f1f1"
    },
    primary: {
      main: "#0073b6"
    },
    secondary: {
      main: "#2e3359"
    },
    spacing: 8,
  },
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        padding: 0,
        fontSize: '13px',
        '& .MuiButtonBase-root': {
          height: '30px'
        }
      }
    },
    MUIDataTableHeadCell: {
      root: {
        padding: '8px 0',
        fontSize: '14px',
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9 !important'
      }
    },
    MuiTableCell: {
      footer: {
        height: '40x'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#f9f9f9'
      }
    },
    MuiButton: {
      root: {
        borderRadius: 5,
        border: 0,
        height: 36,
        textTransform: 'none',
        padding: '0 40px'
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 5,
        height: 36,
        //marginTop: '5px',
        //alignItems: 'center',*/
        fontSize: '14px'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#0073b6',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: '#0073b6',
      },
      daySelected: {
        backgroundColor: '#0073b6',
      },
      dayDisabled: {
        color: '#0073b6',
      },
      current: {
        color: '#0073b6',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#0073b6',
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, 
    },
    MuiChip: {
      size: 'small', 
    },
  },
});

export default theme;
