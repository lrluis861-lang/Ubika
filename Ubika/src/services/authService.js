// HARDCODE
// Simulamos el login hasta tener el backend
import { users } from '../data/mockUsers';

// HARDCODE: login simulado
export const login = (email, password) => {
  return users.find(
    (u) => u.email === email && u.password === password
  );
};

// REGISTER (HARDCODE)
export const register = (name, email, password) => {
  const exists = users.find((u) => u.email === email);
  if (exists) return null;

  const newUser = { name, email, password };
  users.push(newUser);
  return newUser;
};