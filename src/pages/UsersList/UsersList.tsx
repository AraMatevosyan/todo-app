import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { AppDispatch, RootState } from "../../redux";
import { fetchUsers, setPage } from "../../redux/usersList";
import { User } from "../../redux/usersList/interface";
import { addUsersToDB } from "../../services/indexedDB";
import { useSorting } from "../../hooks";
import { Search, Table } from "../../components";
import { Styled } from "./UsersList.styled";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useQueryParam(
    "search",
    withDefault(StringParam, ""),
  ) as [string, Dispatch<SetStateAction<string>>];

  const { field, order, update } = useSorting<keyof User>();

  const { users, loading, error, page, totalPages } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    (async () => {
      await addUsersToDB();
    })();
  }, []);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit: 10,
        sort: { field, order },
        search_query: searchQuery,
      }),
    );
  }, [dispatch, page, field, order, searchQuery]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      size: 40,
      header: () => (
        <div onClick={() => update("name")} style={{ cursor: "pointer" }}>
          Name{" "}
          {field === "name" &&
            (order === "asc" ? "🔼" : order === "desc" ? "🔽" : "")}
        </div>
      ),
      cell: (info) => {
        return info.getValue();
      },
    },
    {
      accessorKey: "age",
      size: 10,
      header: () => (
        <div onClick={() => update("age")} style={{ cursor: "pointer" }}>
          Age{" "}
          {field === "age" &&
            (order === "asc" ? "🔼" : order === "desc" ? "🔽" : "")}
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      size: 40,
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "id",
      size: 10,
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
