import { openDB } from "idb";
import { FetchUsersPayload, User } from "../redux/usersList/interface";

const DATABASE_NAME = "usersDB";
const DATABASE_VERSION = 1;
const STORE_NAME = "users";

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", age: 35 },
  { id: 4, name: "Emily Brown", email: "emily@example.com", age: 28 },
  { id: 5, name: "William Wilson", email: "william@example.com", age: 40 },
  { id: 6, name: "Emma Taylor", email: "emma@example.com", age: 32 },
  { id: 7, name: "David Martinez", email: "david@example.com", age: 27 },
  { id: 8, name: "Olivia Anderson", email: "olivia@example.com", age: 33 },
  { id: 9, name: "Daniel Thomas", email: "daniel@example.com", age: 29 },
  { id: 10, name: "Sophia Hernandez", email: "sophia@example.com", age: 38 },
  { id: 11, name: "James Wright", email: "james@example.com", age: 31 },
  { id: 12, name: "Isabella Clark", email: "isabella@example.com", age: 36 },
  { id: 13, name: "Alexander Lewis", email: "alexander@example.com", age: 26 },
  { id: 14, name: "Charlotte Hall", email: "charlotte@example.com", age: 39 },
  { id: 15, name: "Ethan Allen", email: "ethan@example.com", age: 34 },
  { id: 16, name: "Mia Walker", email: "mia@example.com", age: 37 },
  { id: 17, name: "Benjamin Scott", email: "benjamin@example.com", age: 23 },
  { id: 18, name: "Ava Green", email: "ava@example.com", age: 41 },
  { id: 19, name: "Jacob Adams", email: "jacob@example.com", age: 24 },
  { id: 20, name: "Liam Baker", email: "liam@example.com", age: 22 },
];

export async function getUsersFromDB(
  page: number,
  limit: number,
  sort: { field?: string; order?: "asc" | "desc" },
  search_query: string,
): Promise<FetchUsersPayload> {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const allUsers = await store.getAll();

  let filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search_query.toLowerCase()),
  );
  if (sort.order) {
    filteredUsers = filteredUsers.sort((a, b) => {
      if (sort.field === "name") {
        return sort.order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort.field === "age") {
        return sort.order === "asc" ? a.age - b.age : b.age - a.age;
      }
      return 0;
    });
  }

  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return { users: paginatedUsers, total, totalPages };
}

export async function getUserFromDB(id: number): Promise<User | null> {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get(id);
}

export const addUsersToDB = async () => {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name", { unique: false });
      store.createIndex("email", "email", { unique: false });
      store.createIndex("age", "age", { unique: false });
    },
  });

  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  for (const user of users) {
    const existingUser = await store.get(user.id);
    if (!existingUser) {
      await store.add(user);
    }
  }

  await transaction.done;
};
