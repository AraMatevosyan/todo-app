import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.header};
  color: white;
  padding: 1rem;
`;

const Title = styled.h1`
  margin: 0;
`;

export const Styled = { HeaderWrapper, Title };
