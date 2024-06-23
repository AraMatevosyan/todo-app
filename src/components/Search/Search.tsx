import React, { PropsWithChildren } from "react";
import { Styled } from "./Search.styled";
import {State} from "../../types";

type SearchProps = {
  searchState: State<string>;
} & PropsWithChildren;

export const Search: React.FC<SearchProps> = ({ searchState }) => {
  const [searchQuery, setSearchQuery] = searchState;

  const handleClearSearch = () => setSearchQuery("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Styled.SearchWrapper>
      <Styled.SearchInput
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {searchQuery && (
        <Styled.ClearButton onClick={handleClearSearch}>
          &times;
        </Styled.ClearButton>
      )}
    </Styled.SearchWrapper>
  );
};
