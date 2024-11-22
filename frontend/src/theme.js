import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5C6BC0", // A soft purple for a furniture site
    },
    secondary: {
      main: "#FF7043", // A warm orange accent color
    },
    background: {
      default: "#F5F5F5", // Light grey background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      color: "#333333", // Dark grey text
    },
  },
});

export default theme;
