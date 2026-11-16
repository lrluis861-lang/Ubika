import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from '@expo/vector-icons';

export default function DecisionScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Selecciona tu situación
      </Text>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("InfoPersonal")}
      >
          <Ionicons
            name="arrow-back"
            size={26}
            color={theme.colors.text}
          />
      </TouchableOpacity>

      <GradientButton
        title="Tengo más de 25k"
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      />
      <GradientButton
        title="Tengo menos de 25k"
        onPress={() => navigation.navigate("CarteraAhorro")}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: "80%",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    fontWeight: "600",
  },
});



// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function DecisionScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Selecciona tu situación</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.replace("Home")}
//       >
//         <Text style={styles.buttonText}>Tengo más de 25k</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.replace("CarteraAhorro")}
//       >
//         <Text style={styles.buttonText}>Tengo menos de 25k</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEFFF5",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 40,
//     color: "#2E4057",
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#E10012",
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "#FEFFF5",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
