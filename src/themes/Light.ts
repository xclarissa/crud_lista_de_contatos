import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

export const Light = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blue[500],
      contrastText: '#ffffff'
    },
    secondary: {
      main: green[700],
      dark: blue[800],
      light: blue[500],
      contrastText: '#ffffff'
    }
    
  }
})