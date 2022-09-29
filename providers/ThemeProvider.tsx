import React from "react";
import {
  onPrimary,
  primary,
  secondary,
  onSecondary,
  background,
  onBackground,
} from "../constants/colors";
export const defaultTheme = {
  primary,
  onPrimary,
  secondary,
  onSecondary,
  background,
  onBackground,
};
export const ThemeContext = React.createContext(defaultTheme);

export const ThemeProvider = ThemeContext.Provider;
