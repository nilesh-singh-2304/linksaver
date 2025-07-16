import bcrypt from "bcryptjs";

const USERS_KEY = "link-saver-users";
const SESSION_KEY = "link-saver-session";

export const registerUser = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const exists = users.find((u: any) => u.email === email);
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const user = users.find((u: any) => u.email === email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  // Fake JWT: just store email as session
  localStorage.setItem(SESSION_KEY, email);
};

export const getCurrentUser = () => {
  return localStorage.getItem(SESSION_KEY);
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};
