import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid black;
  table-layout: fixed;

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    &:last-child {
      border-right: 0;
    }
  }

  th {
    background: ${({ theme }) => theme.table.header};
  }
`;

const Checkbox = styled.input`
  width: 100%;
  margin: auto 0;
`;

const Pagination = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Styled = { TableWrapper, Table, Pagination, Checkbox };
