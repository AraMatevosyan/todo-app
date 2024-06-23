export interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  id: number;
}
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

export interface FetchUsersPayload {
  users: User[];
  total: number;
  totalPages: number;
}

export interface FetchUsersParams {
  page: number;
  limit: number;
  sort: {
    field?: keyof User;
    order?: "asc" | "desc";
  };
  search_query: string;
}
