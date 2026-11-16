// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Splash3D             from "../screens/SplashScreen";
// import IntroScreen          from "../screens/IntroScreen";
// import DecisionScreen       from "../screens/DecisionScreen";
// import HomeScreen           from "../screens/HomeScreen";
// import CarteraAhorroScreen  from "../screens/CarteraAhorroScreen";
// import LoginScreen          from "../screens/LoginScreen";
// import RegisterScreen       from "../screens/RegisterScreen";
// import PlanAhorroScreen     from "../screens/PlanAhorroScreen";
// import InfoPersonalScreen   from "../screens/InfoPersonalScreen";
// import ProfileScreen        from "../screens/ProfileScreen";
// import ForoScreen           from "../screens/ForoScreen";
// import TerrenoDetalleScreen from "../screens/TerrenoDetalleScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Splash"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Splash"          component={Splash3D} />
//       <Stack.Screen name="Intro"           component={IntroScreen} />
//       <Stack.Screen name="Decision"        component={DecisionScreen} />
//       <Stack.Screen name="Login"           component={LoginScreen} />
//       <Stack.Screen name="Register"        component={RegisterScreen} />
//       <Stack.Screen name="Home"            component={HomeScreen} />
//       <Stack.Screen name="CarteraAhorro"   component={CarteraAhorroScreen} />
//       <Stack.Screen name="PlanAhorro"      component={PlanAhorroScreen} />
//       <Stack.Screen name="InfoPersonal"    component={InfoPersonalScreen} />
//       <Stack.Screen name="Profile"         component={ProfileScreen} />
//       <Stack.Screen name="Foro"            component={ForoScreen} />
//       <Stack.Screen name="TerrenoDetalle"  component={TerrenoDetalleScreen} />
//     </Stack.Navigator>
//   );
// }

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash3D             from "../screens/SplashScreen";
import IntroScreen          from "../screens/IntroScreen";
import DecisionScreen       from "../screens/DecisionScreen";
import HomeScreen           from "../screens/HomeScreen";
import CarteraAhorroScreen  from "../screens/CarteraAhorroScreen";
import LoginScreen          from "../screens/LoginScreen";
import RegisterScreen       from "../screens/RegisterScreen";
import PlanAhorroScreen     from "../screens/PlanAhorroScreen";
import InfoPersonalScreen   from "../screens/InfoPersonalScreen";
import ProfileScreen        from "../screens/ProfileScreen";
import ForoScreen           from "../screens/ForoScreen";
import TerrenoDetalleScreen from "../screens/TerrenoDetalleScreen";
import ChatScreen           from "../screens/ChatScreen";
import CalendarioScreen     from "../screens/CalendarioScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash"          component={Splash3D} />
      <Stack.Screen name="Intro"           component={IntroScreen} />
      <Stack.Screen name="Decision"        component={DecisionScreen} />
      <Stack.Screen name="Login"           component={LoginScreen} />
      <Stack.Screen name="Register"        component={RegisterScreen} />
      <Stack.Screen name="Home"            component={HomeScreen} />
      <Stack.Screen name="CarteraAhorro"   component={CarteraAhorroScreen} />
      <Stack.Screen name="PlanAhorro"      component={PlanAhorroScreen} />
      <Stack.Screen name="InfoPersonal"    component={InfoPersonalScreen} />
      <Stack.Screen name="Profile"         component={ProfileScreen} />
      <Stack.Screen name="Foro"            component={ForoScreen} />
      <Stack.Screen name="TerrenoDetalle"  component={TerrenoDetalleScreen} />
      <Stack.Screen name="Chat"            component={ChatScreen} />
      <Stack.Screen name="Calendario"      component={CalendarioScreen} />
    </Stack.Navigator>
  );
}