export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface HomeState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}
