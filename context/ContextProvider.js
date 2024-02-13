"use client";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const modeCurrentTheme = {
  light: false,
  dark: true,
};

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColorText, setCurrentColorText] = useState("#000000");
  const [currentColor, setCurrentColor] = useState("#A5D721");
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentMode, setCurrentMode] = useState(modeCurrentTheme);
  const [isClicked, setIsClicked] = useState(initialState);
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };
  const setColorText = (color) => {
    setCurrentColorText(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const handleClose = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: false });

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,

        screenSize,
        setScreenSize,

        currentColor,
        setCurrentColor,
        setColor,

        currentColorText,
        setCurrentColorText,
        setColorText,

        themeSettings,
        setThemeSettings,

        currentMode,
        setCurrentMode,

        isClicked,
        setIsClicked,
        handleClick,
        handleClose,
        initialState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
