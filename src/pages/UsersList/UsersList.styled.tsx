import styled from "styled-components";
import { NavLink } from "react-router-dom";

const UsersListWrapper = styled.div`
  max-width: 670px;
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  width: 100%;
  text-align: center;
`;
export const Styled = { UsersListWrapper, Link };
