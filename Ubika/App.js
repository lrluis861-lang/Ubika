import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeProvider from "./src/theme/ThemeProvider";
import { TerrenosProvider } from "./src/context/TerrenosContext"; // ← solo una vez
import { ForoProvider }     from "./src/context/ForoContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    MozillaHeadlineBold: require("./src/assets/fonts/MozillaHeadline-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <TerrenosProvider>
        <ForoProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ForoProvider>
      </TerrenosProvider>
    </ThemeProvider>
  );
}


// import React from "react";
// import { ActivityIndicator, View } from "react-native";
// import { useFonts } from "expo-font";
// import AppNavigator from "./src/navigation/AppNavigator";
// import { ThemeProvider } from "./src/theme/ThemeProvider";

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     MozillaHeadlineBold: require("./src/assets/fonts/MozillaHeadline-Bold.ttf"),  
//   });

//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <AppNavigator />
//     </ThemeProvider>
//   );
// }
