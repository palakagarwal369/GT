import React from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
// import teal from "@material-ui/core/colors/teal";

import { COLOR_MODE_KEY } from "../constants";
import { usePersistentState } from "../hooks";

export const ThemeContext = createContext();

export const ThemeContextProvider = props => {
  const { children } = props;

  const [colorMode, setColorMode] = usePersistentState(COLOR_MODE_KEY, "dark");

  const muiTheme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: teal,
          secondary: teal,
          type: colorMode
        }
      }),
    [colorMode]
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(current => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeContext.Provider
        value={{
          colorMode,
          setColorMode,
          toggleColorMode,
          muiTheme
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
