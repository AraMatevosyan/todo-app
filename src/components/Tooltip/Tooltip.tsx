import React, { PropsWithChildren } from "react";
import { Styled } from "./Tooltip.styled";

type TooltipProps = {
  text: string;
} & PropsWithChildren;

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
  <Styled.TooltipWrapper>
    {children}
    <Styled.TooltipContent>{text}</Styled.TooltipContent>
  </Styled.TooltipWrapper>
);
