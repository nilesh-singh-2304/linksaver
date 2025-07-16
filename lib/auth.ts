import bcrypt from "bcryptjs";

const USERS_KEY = "link-saver-users";
const SESSION_KEY = "link-saver-session";

type User = {
  email: string;
  password: string; // hashed
};

// Helper to safely get parsed localStorage
const getUsersFromStorage = (): User[] => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) as User[] : [];
  } catch {
    return [];
  }
};

export const registerUser = async (email: string, password: string): Promise<void> => {
  const users = getUsersFromStorage();
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (email: string, password: string): Promise<void> => {
  const users = getUsersFromStorage();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  localStorage.setItem(SESSION_KEY, email); // Fake JWT
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(SESSION_KEY);
};

export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};
