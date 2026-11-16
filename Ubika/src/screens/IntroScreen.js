import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GradientButton from "../components/GradientButton";
import { useTheme } from "../theme/ThemeProvider";

export default function IntroScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Bienvenido a Ubika
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Selecciona tu camino para empezar:
      </Text>

      <GradientButton
        title="Comenzar"
        onPress={() => navigation.replace("Login")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: "70%",
  },
});




// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { COLORS } from "../theme/colors";
// import { FONTS } from "../theme/typography";

// export default function IntroScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bienvenido a UBIKA</Text>
//       <Text style={styles.text}>
//         Descubre terrenos cooperativos, gestiona tu comunidad y conecta con
//         otros usuarios de manera sencilla y segura.
//       </Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.replace("Login")}
//       >
//         <Text style={styles.buttonText}>Comenzar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: COLORS.secondary, // Blanco suave
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontFamily: FONTS.headlineBold,
//     fontSize: 28,
//     color: COLORS.primary, // Rojo vibrante
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   text: {
//     fontFamily: FONTS.headlineBold,
//     fontSize: 16,
//     color: COLORS.tertiary, // Azul oscuro
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 10,
//     width: "60%",
//   },
//   buttonText: {
//     fontFamily: FONTS.headlineBold,
//     color: COLORS.secondary,
//     textAlign: "center",
//     fontSize: 16,
//   },
// });
