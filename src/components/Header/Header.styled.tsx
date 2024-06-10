import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 10px;
  border-radius: 4px;

  &.active {
    background-color: #145da0;
  }
`;

export const Styled = { HeaderWrapper, Title, Link, LinkWrapper };
