import styled from "styled-components";

const TooltipWrapper = styled.div`
  position: relative;
  display: block;
`;

const TooltipContent = styled.span`
  visibility: hidden;
  min-width: 120px;
  max-width: fit-content;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

export const Styled = { TooltipWrapper, TooltipContent };
