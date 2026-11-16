import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";
import api from "../api/axios"; // 👈 Conexión directa
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor rellena todos los campos");
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Petición de login a Laravel
      const response = await api.post('/auth/login', { 
        email: email.toLowerCase(), 
        password: password 
      });

      // 2. GUARDAMOS EL TOKEN
      await AsyncStorage.setItem('token', response.data.access_token);
      if (response.data.user) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // 3. Vamos al Home
      navigation.replace("Home");

    } catch (error) {
      const msg = error.response?.data?.message || "Credenciales incorrectas o error del servidor";
      Alert.alert("Error de Inicio de Sesión", msg);
      console.log("Error Login:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Iniciar Sesión</Text>
      
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.colors.tertiary}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={theme.colors.tertiary}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginBottom: 15 }} />
      ) : (
        <GradientButton
          title="Iniciar Sesión"
          onPress={handleLogin}
          style={styles.button}
        />
      )}
      
      <GradientButton
        title="Registrarse"
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    marginBottom: 15,
  },
});