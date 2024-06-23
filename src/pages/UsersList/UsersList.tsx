import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { AppDispatch, RootState } from "../../redux";
import { fetchUsers, setPage } from "../../redux/usersList";
import { User } from "../../redux/usersList/interface";
import {useDebouncedQueryParam, useSorting} from "../../hooks";
import {Search, Table, Tooltip} from "../../components";
import { Styled } from "./UsersList.styled";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, debouncedSearchQuery, setSearchQuery] = useDebouncedQueryParam('search');
  const { field, order, update } = useSorting<keyof User>();

  const { users, page, totalPages } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit: 10,
        sort: { field, order },
        search_query: debouncedSearchQuery,
      }),
    );
  }, [dispatch, page, field, order, debouncedSearchQuery]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      size: 30,
      header: () => (
        <div onClick={() => update("firstName")} style={{ cursor: "pointer" }}>
          First Name
          {field === "firstName" &&
            (order === "asc" ? "🔼" : order === "desc" ? "🔽" : "")}
        </div>
      ),
      cell: (info) => {
          const text = info.getValue() as string;

          return (
              <Tooltip text={text}>
                  <Styled.Text>{text}</Styled.Text>
              </Tooltip>
          )
      },
    },
    {
      accessorKey: "lastName",
      size: 30,
      header: () => (
          <div onClick={() => update("lastName")} style={{ cursor: "pointer" }}>
            Last Name
            {field === "lastName" &&
                (order === "asc" ? "🔼" : order === "desc" ? "🔽" : "")}
          </div>
      ),
      cell: (info) => {
          const text = info.getValue() as string;

          return (
              <Tooltip text={text}>
                  <Styled.Text>{text}</Styled.Text>
              </Tooltip>
          )
      },
    },
    {
      accessorKey: "age",
      size: 5,
      header: () => (
        <div onClick={() => update("age")} style={{ cursor: "pointer" }}>
          Age
          {field === "age" &&
            (order === "asc" ? "🔼" : order === "desc" ? "🔽" : "")}
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      size: 30,
      header: "Email",
      cell: (info) => {
        const text = info.getValue() as string;

        return (
            <Tooltip text={text}>
              <Styled.Text>{text}</Styled.Text>
            </Tooltip>
        )
      },
    },
    {
      accessorKey: "id",
      size: 5,
      header: "",
      cell: (info) => {
        const id = info.getValue() || "1";
        return <Styled.Link to={`/users/${id}`}>↗</Styled.Link>;
      },
    },
  ];

  return (
    <Styled.UsersListWrapper>
      <h1>User List</h1>
      <Search searchState={[searchQuery, setSearchQuery]} />
      <Table
        columns={columns}
        data={users}
        pagination={{
          pageIndex: page,
          pageCount: totalPages,
          gotoPage: handlePageChange,
        }}
      />
    </Styled.UsersListWrapper>
  );
};

export default UsersList;
