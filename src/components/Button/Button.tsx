import React, { PropsWithChildren } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { Styled } from "./Button.styled";

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  styleType?: "primary" | "secondary";
} & PropsWithChildren;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  styleType = "primary",
}) => {
  const { currentTheme } = useTheme();

  return (
    <Styled.Button
      onClick={onClick}
      disabled={disabled}
      styleType={styleType}
      theme={currentTheme}
    >
      {children}
    </Styled.Button>
  );
};
