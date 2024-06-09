import styled from "styled-components";

const Button = styled.button<{ styleType: "primary" | "secondary" }>`
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background: ${({ styleType, theme }) =>
    styleType === "primary" ? theme.button.primary : theme.button.secondary};
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Styled = { Button };
