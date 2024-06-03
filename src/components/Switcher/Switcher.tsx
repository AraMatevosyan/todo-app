import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import { Styled } from "./Switcher.styled";

type SwitcherProps = {
  onChange: () => void;
};

export const Switcher: React.FC<SwitcherProps> = ({ onChange }) => {
  const { currentTheme } = useTheme();

  return (
    <Styled.SwitchWrapper>
      <Styled.SwitchInput type="checkbox" onChange={onChange} />
      <Styled.SwitchSlider theme={currentTheme} />
    </Styled.SwitchWrapper>
  );
};
