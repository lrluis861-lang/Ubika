// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
// import GradientButton from "../components/GradientButton";
// import { useTheme } from "../theme/ThemeProvider";
// import { Ionicons } from '@expo/vector-icons';

// export default function PlanAhorroScreen({ navigation }) {
//   const { theme } = useTheme();
//   const [dineroObjetivo, setDineroObjetivo] = useState("");
//   const [inversionMensual, setInversionMensual] = useState("");

//   const handleCalcular = () => {
//     if (!dineroObjetivo || !inversionMensual) {
//       Alert.alert("Error", "Por favor completa todos los campos");
//       return;
//     }
//     navigation.navigate("CarteraAhorroScreen", { dineroObjetivo, inversionMensual });
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>

//       {/* Botón volver atrás */}
//       <TouchableOpacity 
//         style={styles.backButton} 
//         onPress={() => navigation.navigate("CarteraAhorro")}
//       >
//         <Ionicons
//           name="arrow-back"
//           size={26}
//           color={theme.colors.text}
//         />
//       </TouchableOpacity>

//       <Text style={[styles.title, { color: theme.colors.text }]}>Plan de Ahorro</Text>

//       <TextInput
//         style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
//         placeholder="Dinero Objetivo"
//         placeholderTextColor={theme.colors.text + "99"}
//         keyboardType="numeric"
//         value={dineroObjetivo}
//         onChangeText={setDineroObjetivo}
//       />
//       <TextInput
//         style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
//         placeholder="Inversión Mensual"
//         placeholderTextColor={theme.colors.text + "99"}
//         keyboardType="numeric"
//         value={inversionMensual}
//         onChangeText={setInversionMensual}
//       />

//       <Text style={[styles.note, { color: theme.colors.text }]}>
//         Nota: El dinero objetivo es la cantidad de dinero que el usuario busca tener al final.
//       </Text>

//       <GradientButton title="Calcular" onPress={handleCalcular} style={styles.button} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   backButton: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//   },
//   backText: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 20,
//     fontSize: 18,
//   },
//   note: {
//     fontSize: 14,
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   button: {
//     width: "30%",
//     alignSelf: "center",
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from '@expo/vector-icons';

export default function PlanAhorroScreen({ navigation }) {
  const { theme } = useTheme();
  const [dineroObjetivo, setDineroObjetivo] = useState("");
  const [inversionMensual, setInversionMensual] = useState("");

  const handleCalcular = () => {
    if (!dineroObjetivo || !inversionMensual) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    // ¡CORREGIDO AQUÍ! Quitamos la palabra "Screen" para que coincida con tu navegador
    navigation.navigate("CarteraAhorro", { 
      dineroObjetivo, 
      inversionMensual 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>

      {/* Botón volver atrás */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("CarteraAhorro")}
      >
        <Ionicons
          name="arrow-back"
          size={26}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.colors.text }]}>Plan de Ahorro</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
        placeholder="Dinero Objetivo (€)"
        placeholderTextColor={theme.colors.text + "99"}
        keyboardType="numeric"
        value={dineroObjetivo}
        onChangeText={setDineroObjetivo}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
        placeholder="Inversión Mensual (€)"
        placeholderTextColor={theme.colors.text + "99"}
        keyboardType="numeric"
        value={inversionMensual}
        onChangeText={setInversionMensual}
      />

      <Text style={[styles.note, { color: theme.colors.text }]}>
        Nota: El dinero objetivo es la cantidad de dinero que el usuario busca tener al final.
      </Text>

      <GradientButton title="Calcular" onPress={handleCalcular} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  note: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: "70%",
    alignSelf: "center",
  },
});