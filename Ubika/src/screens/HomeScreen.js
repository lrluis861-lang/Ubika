import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../api/auth";

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [infoOpen, setInfoOpen] = useState(false);
  const iconColor = isDark ? "#fff" : "#000";

  const infoTranslate = useRef(new Animated.Value(-50)).current;
  const infoOpacity   = useRef(new Animated.Value(0)).current;

  const animateOpen = (translate, opacity) => {
    Animated.parallel([
      Animated.spring(translate, { toValue: 0, damping: 10, useNativeDriver: true }),
      Animated.timing(opacity,   { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const animateClose = (translate, opacity) => {
    Animated.parallel([
      Animated.spring(translate, { toValue: -50, damping: 10, useNativeDriver: true }),
      Animated.timing(opacity,   { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const toggleInfo = () => {
    const newState = !infoOpen;
    setInfoOpen(newState);
    newState ? animateOpen(infoTranslate, infoOpacity) : animateClose(infoTranslate, infoOpacity);
  };

  const closeAll = () => {
    if (infoOpen) { setInfoOpen(false); animateClose(infoTranslate, infoOpacity); }
  };

  const logoOpacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }, [isDark]);

  // 👇 Logout real con la API
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // si falla igualmente navegamos
    }
    navigation.replace("Login");
  };

  const buttons = [
    { label: "Chat",       icon: "chatbubble-ellipses-outline", action: () => navigation.navigate("Chat") },
    { label: "Calendario", icon: "calendar-outline",            action: () => navigation.navigate("Calendario") },
    { label: "Perfil",     icon: "person-outline",              action: () => navigation.navigate("Profile") },
    { label: "Cartera",    icon: "wallet-outline",              action: () => navigation.navigate("CarteraAhorro") },
    { label: "Foro",       icon: "chatbox-ellipses-outline",    action: () => navigation.navigate("Foro") },
  ];

  const row1 = buttons.slice(0, 2);
  const row2 = buttons.slice(2, 3);
  const row3 = buttons.slice(3, 5);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      {infoOpen && <Pressable style={styles.overlay} onPress={closeAll} />}

      <View style={styles.topBar}>
        {/* 👇 ahora llama al logout real */}
        <Pressable onPress={handleLogout}>
          <Text style={{ color: iconColor, fontSize: 16, fontWeight: "600" }}>
            Cerrar Sesión
          </Text>
        </Pressable>
        <View style={styles.rightIcons}>
          <Pressable onPress={toggleInfo} style={styles.iconBtn}>
            <Ionicons name="help-circle-outline" size={26} color={iconColor} />
          </Pressable>
          <Pressable onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={26} color={iconColor} />
          </Pressable>
        </View>
      </View>

      {infoOpen && (
        <Animated.View style={[styles.infoDropdown, { backgroundColor: theme.colors.primary }, { transform: [{ translateY: infoTranslate }], opacity: infoOpacity }]}>
          <Text style={styles.infoTitle}>ℹ️ Información</Text>
          <Text style={styles.infoText}>• Chat: habla con tus compañeros.</Text>
          <Text style={styles.infoText}>• Calendario: gestiona tus eventos.</Text>
          <Text style={styles.infoText}>• Perfil: edita tus datos personales.</Text>
          <Text style={styles.infoText}>• Cartera: controla tus ahorros.</Text>
          <Text style={styles.infoText}>• Foro: comparte ideas con la comunidad.</Text>
        </Animated.View>
      )}

      <Animated.Image
        key={isDark ? "dark-logo" : "light-logo"}
        source={isDark ? require("../assets/images/logoB.png") : require("../assets/images/logoCorp.png")}
        style={[styles.logo, { opacity: logoOpacity }]}
        resizeMode="contain"
      />

      <Text style={[styles.welcome, { color: theme.colors.text }]}>
        ¡Bienvenido a tu espacio cooperativo!
      </Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          {row1.map((btn, idx) => <IOSButton key={idx} label={btn.label} icon={btn.icon} onPress={btn.action} theme={theme} />)}
        </View>
        <View style={[styles.row, styles.rowCenter]}>
          {row2.map((btn, idx) => <IOSButton key={idx} label={btn.label} icon={btn.icon} onPress={btn.action} theme={theme} />)}
        </View>
        <View style={styles.row}>
          {row3.map((btn, idx) => <IOSButton key={idx} label={btn.label} icon={btn.icon} onPress={btn.action} theme={theme} />)}
        </View>
      </View>
    </View>
  );
}

function IOSButton({ label, icon, onPress, theme }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn  = () => Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.tertiary]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.appButton}
        >
          <Ionicons name={icon} size={40} color="#fff" style={{ marginBottom: 10 }} />
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, paddingTop: 60, alignItems: "center" },
  overlay:      { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1 },
  topBar:       { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 10 },
  rightIcons:   { flexDirection: "row", alignItems: "center" },
  iconBtn:      { marginLeft: 18 },
  logo:         { width: 180, height: 100, marginBottom: 10 },
  welcome:      { fontSize: 18, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  grid:         { width: "90%", gap: 16 },
  row:          { flexDirection: "row", justifyContent: "space-between" },
  rowCenter:    { justifyContent: "center" },
  buttonWrapper:{ width: "48%", borderRadius: 25 },
  appButton:    { height: 140, borderRadius: 25, justifyContent: "center", alignItems: "center" },
  label:        { fontSize: 14, fontWeight: "600", color: "#fff" },
  infoDropdown: { position: "absolute", top: 80, right: 20, padding: 15, borderRadius: 12, zIndex: 3, minWidth: 260 },
  infoTitle:    { color: "#fff", fontWeight: "700", fontSize: 15, marginBottom: 8 },
  infoText:     { color: "#fff", fontSize: 13, marginBottom: 4, lineHeight: 20 },
});