import styled from "styled-components";

const TableWrapper = styled.div`
    padding: 1rem;
`;

const Table = styled.table`
      border-spacing: 0;
      border: 1px solid black;

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

const Pagination = styled.div`
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const Styled = { TableWrapper, Table, Pagination };
