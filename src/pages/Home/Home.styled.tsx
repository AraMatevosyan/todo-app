import styled from "styled-components";

const HomeWrapper = styled.div`
  max-width: 670px;
`;

const ActionsPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Styled = { HomeWrapper, ActionsPanel, TextArea, Text };
