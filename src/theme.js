import { createTheme } from "@mui/material/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },

    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: arcBlue,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: arcBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: arcBlue,
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: arcBlue,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: arcGrey,
    },
    subtitle2: {
      color: "white",
      fontWeight: 300,
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGrey,
      fontWeight: 300,
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGrey,
    },
    learnButton: {
      borderColor: arcBlue,
      borderWidth: 2,
      textTransform: "none",
      color: arcBlue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },

  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          ":before": {
            borderBottom: `2px solid ${arcBlue}`,
          },
        },
        root: {
          color: arcGrey,
          fontWeight: 300,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: arcBlue,
          fontWeight: 700,
        },
        labelPlacementStart: {
          marginLeft: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: arcBlue,
          fontSize: "1rem",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: "1rem",
          fontWeight: 700,
          color: arcBlue,
          borderColor: arcBlue,
          borderWidth: 2,
        },
        body: {
          color: arcGrey,
          borderColor: arcBlue,
          borderWidth: 2,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          ":hover:not(.Mui-disabled):before":{
            borderBottom:`2px solid ${arcBlue} !important`
          }
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.MuiSelect-icon": {
            fill: arcOrange,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          ":focus": {
            background: "none",
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: arcOrange,
          },
          "&.Mui-active": {
            color: arcOrange,
          },
        },
        icon: {
          fill: arcOrange,
        },
      },
    },

    // MuiFormControl:{
    //   styleOverrides:{
    //     root:{
    //       ":hover":{
    //         borderBottom:'20px solid yellow',
    //         zIndex:10000
    //       }
    //     }
    //   }
    // }
  },
});

export default theme;
