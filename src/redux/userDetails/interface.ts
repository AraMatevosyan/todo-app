import { User } from "../usersList/interface";

export interface UserDetailsState {
    user?: User;
    loading: boolean;
    error: string | null;
}
