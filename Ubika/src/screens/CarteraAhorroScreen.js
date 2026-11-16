// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import GradientButton from "../components/GradientButton";
// import { useTheme } from "../theme/ThemeProvider";
// import { Ionicons } from "@expo/vector-icons";

// export default function CarteraAhorroScreen({ navigation }) {
//   const { theme } = useTheme();

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
  
//       {/* BOTÓN VOLVER */}
//       <View style={styles.topBar}>
//         <Ionicons
//           name="arrow-back"
//           size={26}
//           color={theme.colors.text}
//           onPress={() => navigation.navigate("Decision")}
//         />
//       </View>
  
//       <Text style={[styles.title, { color: theme.colors.text }]}>
//         Cartera de Ahorro
//       </Text>
  
//       <Text style={[styles.info, { color: theme.colors.text }]}>
//         Tu saldo es menor de 25k, aquí podrás gestionar tus ahorros.
//       </Text>
  
//       <GradientButton
//         title="Crear Plan de Ahorro"
//         onPress={() => navigation.replace("PlanAhorro")}
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
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   info: {
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   button: {
//     width: "70%",
//   },
//   topBar: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//   },
// });


import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function CarteraAhorroScreen({ navigation, route }) {
  const { theme } = useTheme();
  
  // Recibimos los datos del plan si venimos de la pantalla PlanAhorro
  const { dineroObjetivo, inversionMensual } = route.params || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
  
      {/* BOTÓN VOLVER */}
      <View style={styles.topBar}>
        <Ionicons
          name="arrow-back"
          size={26}
          color={theme.colors.text}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
  
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Cartera de Ahorro
      </Text>
  
      <Text style={[styles.info, { color: theme.colors.text }]}>
        Tu saldo es menor de 25k, aquí podrás gestionar tus ahorros.
      </Text>

      {/* Si hay un plan activo, lo mostramos */}
      {dineroObjetivo && inversionMensual && (
        <View style={[styles.planCard, { borderColor: theme.colors.text }]}>
          <Text style={[styles.planTitle, { color: theme.colors.text }]}>Tu Plan Actual:</Text>
          <Text style={[styles.planText, { color: theme.colors.text }]}>Objetivo: {dineroObjetivo} €</Text>
          <Text style={[styles.planText, { color: theme.colors.text }]}>Inversión mensual: {inversionMensual} €/mes</Text>
        </View>
      )}
  
      <GradientButton
        title={dineroObjetivo ? "Modificar Plan" : "Crear Plan de Ahorro"}
        onPress={() => navigation.replace("PlanAhorro")}
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
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  planCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: "90%",
    alignItems: "center",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: "80%",
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
});