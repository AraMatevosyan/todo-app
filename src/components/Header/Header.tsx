import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import { themes } from "../../theme/themes";
import { Switcher, Tooltip } from "../";
import { Styled } from "./Header.styled";

export const Header = () => {
  const { currentTheme, switchTheme } = useTheme();
  const tooltipText =
    currentTheme === themes.light
      ? "Switch to dark mode"
      : "Switch to light mode";

  return (
    <Styled.HeaderWrapper theme={currentTheme}>
      <Styled.LinkWrapper>
        <Styled.Link to="/">Home</Styled.Link>
        <Styled.Link to="/users">Users</Styled.Link>
      </Styled.LinkWrapper>
      <Tooltip text={tooltipText}>
        <Switcher onChange={switchTheme} />
      </Tooltip>
    </Styled.HeaderWrapper>
  );
};
