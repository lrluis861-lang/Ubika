// src/api/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios';

// REGISTRO
export const register = async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation: password,
      role: "user" // 👈 IMPORTANTE
    });
  
    await AsyncStorage.setItem('token', response.data.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  
    return response.data;
  };

// LOGIN
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  await AsyncStorage.setItem('token', response.data.access_token);
  await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

// LOGOUT
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }
};

// Obtener usuario guardado localmente
export const getStoredUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Añade esta función al final de src/api/auth.js
export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};