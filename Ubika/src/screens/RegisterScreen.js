// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet } from "react-native";
// import GradientButton from "../components/GradientButton";
// import { useTheme } from "../theme/ThemeProvider";

// export default function RegisterScreen({ navigation }) {
//   const { theme } = useTheme();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
//       <Text style={[styles.title, { color: theme.colors.text }]}>Registro</Text>

//       <TextInput
//         placeholder="Nombre"
//         placeholderTextColor={theme.colors.tertiary}
//         style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor={theme.colors.tertiary}
//         style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         placeholder="Contraseña"
//         placeholderTextColor={theme.colors.tertiary}
//         style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <GradientButton
//         title="Registrarse"
//         onPress={() => navigation.replace("InfoPersonal")}
//         style={styles.button}
//       />

//       <GradientButton
//         title="Volver a Login"
//         onPress={() => navigation.navigate("Login")}
//         style={styles.button}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 20,
//   },
//   button: {
//     width: "80%",
//     marginBottom: 15,
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";
import api from "../api/axios"; // 👈 Usamos nuestra conexión directa a Laravel
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Rellena todos los campos");
      return;
    }

    setLoading(true);

    try {
      // 1. Enviamos los datos exactos que pide Laravel en la documentación
      const response = await api.post('/auth/register', {
        name: name,
        email: email.toLowerCase(),
        password: password,
        password_confirmation: password, // Laravel exige confirmación, mandamos la misma
        role: "user" // Rol por defecto
      });

      // 2. GUARDAMOS EL TOKEN DE FORMA SEGURA EN EL MÓVIL
      await AsyncStorage.setItem('token', response.data.access_token);
      if (response.data.user) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // 3. Pasamos al onboarding
      navigation.replace("InfoPersonal");

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Error al registrarse en el servidor";
      Alert.alert("Error de Registro", msg);
      console.log("Error Registro:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor={theme.colors.tertiary}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.colors.tertiary}
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
          title="Registrarse"
          onPress={handleRegister} // 👈 ¡AHORA SÍ EJECUTA LA FUNCIÓN DE REGISTRO!
          style={styles.button}
        />
      )}

      <GradientButton
        title="Volver a Login"
        onPress={() => navigation.navigate("Login")}
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