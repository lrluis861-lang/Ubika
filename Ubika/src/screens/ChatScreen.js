import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Animated, Dimensions, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import api from "../api/axios";
import { getStoredUser } from "../api/auth";

const { width } = Dimensions.get("window");

function MessageBubble({ msg, isMe, colors, anim }) {
  return (
    <Animated.View style={[
      bS.wrapper,
      isMe ? bS.wrapperMe : bS.wrapperOther,
      { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0,1], outputRange: [20,0] }) }] }
    ]}>
      {!isMe && <Image source={{ uri: msg.avatar || "https://i.pravatar.cc/80" }} style={bS.avatar} />}
      <View style={{ maxWidth: width * 0.65 }}>
        {!isMe && <Text style={[bS.senderName, { color: colors.primary }]}>{msg.name || msg.user?.name || "Usuario"}</Text>}
        {isMe ? (
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x:0, y:0 }} end={{ x:1, y:0 }}
            style={[bS.bubble, bS.bubbleMe]}
          >
            <Text style={[bS.text, { color: "#fff" }]}>{msg.text || msg.message}</Text>
            <Text style={[bS.time, { color: "rgba(255,255,255,0.7)" }]}>{msg.time || ""}</Text>
          </LinearGradient>
        ) : (
          <View style={[bS.bubble, bS.bubbleOther, { backgroundColor: colors.card }]}>
            <Text style={[bS.text, { color: colors.text }]}>{msg.text || msg.message}</Text>
            <Text style={[bS.time, { color: colors.textSecondary }]}>{msg.time || ""}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const bS = StyleSheet.create({
  wrapper:      { flexDirection: "row", marginBottom: 12, alignItems: "flex-end" },
  wrapperMe:    { justifyContent: "flex-end" },
  wrapperOther: { justifyContent: "flex-start" },
  avatar:       { width: 32, height: 32, borderRadius: 16, marginRight: 8, marginBottom: 4 },
  senderName:   { fontSize: 11, fontWeight: "700", marginBottom: 3, marginLeft: 4 },
  bubble:       { borderRadius: 16, padding: 12, paddingBottom: 8 },
  bubbleMe:     { borderBottomRightRadius: 4 },
  bubbleOther:  { borderBottomLeftRadius: 4 },
  text:         { fontSize: 14, lineHeight: 20 },
  time:         { fontSize: 10, marginTop: 4, alignSelf: "flex-end" },
});

export default function ChatScreen({ navigation }) {
  const { theme }  = useTheme();
  const { colors } = theme;

  const [messages,    setMessages]    = useState([]);
  const [inputText,   setInputText]   = useState("");
  const [loading,     setLoading]     = useState(true);
  const [sinGrupo,    setSinGrupo]    = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef                   = useRef(null);

  useEffect(() => {
    const init = async () => {
      const user = await getStoredUser();
      setCurrentUser(user);
      await cargarMensajes();
    };
    init();
  }, []);

  const cargarMensajes = async () => {
    try {
      const res = await api.get('/chat');
      
      if (Array.isArray(res.data)) {
        const msgs = res.data.map(m => ({
          id:     String(m.id),
          userId: String(m.user_id),
          name:   m.user?.name || "Compañero",
          avatar: "https://i.pravatar.cc/80?img=" + m.user_id,
          text:   m.contenido, // <--- ¡CAMBIA 'm.message' POR 'm.contenido' AQUÍ TAMBIÉN!
          time:   new Date(m.created_at).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          anim:   new Animated.Value(1),
        }));
        setMessages(msgs);
        setSinGrupo(false);
      } else {
        setSinGrupo(true);
      }
    } catch (error) {
      console.log("ERROR CARGANDO CHAT:", error.response?.data || error.message);
      setSinGrupo(true);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    // ESTA LÍNEA ES VITAL: Si no, 'text' no existe y nada funciona
    const text = inputText.trim(); 
    if (!text) return;

    const tempMsg = {
      id:     Date.now().toString(),
      userId: String(currentUser?.id || "me"),
      name:   currentUser?.name || "Tú",
      avatar: "https://i.pravatar.cc/80?img=1",
      text, // Aquí usamos la variable que acabamos de definir arriba
      time:   new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      anim:   new Animated.Value(1),
    };

    setMessages(prev => [...prev, tempMsg]);
    setInputText("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      // Petición al backend con la clave correcta: 'contenido'
      await api.post('/chat', { 
        contenido: text 
      });
      
      await cargarMensajes();
    } catch (error) {
      console.log("LA QUEJA DE LARAVEL ES:", error.response?.data);
      Alert.alert("Error", "No se pudo enviar el mensaje");
    }
  };

  const styles = createStyles(colors);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Cargando chat...</Text>
      </SafeAreaView>
    );
  }

  if (sinGrupo) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.emptyIcon}>
          <Ionicons name="chatbubble-ellipses-outline" size={36} color="#fff" />
        </LinearGradient>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Sin chat activo</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Para acceder al chat grupal debes estar aceptado en un terreno cooperativo.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Foro")} style={styles.emptyBtn}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x:0, y:0 }} end={{ x:1, y:0 }}
            style={styles.emptyBtnGradient}
          >
            <Text style={styles.emptyBtnText}>Explorar Terrenos</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x:0, y:0 }} end={{ x:1, y:0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Chat del grupo</Text>
          <Text style={styles.headerSub}>{messages.length} mensajes</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item }) => (
            <MessageBubble
              msg={item}
              isMe={String(item.userId) === String(currentUser?.id)}
              colors={colors}
              anim={item.anim || new Animated.Value(1)}
            />
          )}
          ListEmptyComponent={
            <View style={{ alignItems: "center", paddingTop: 40 }}>
              <Text style={{ color: colors.textSecondary }}>No hay mensajes aún. ¡Sé el primero!</Text>
            </View>
          }
        />

        <View style={[styles.inputRow, { backgroundColor: colors.card, borderTopColor: colors.textSecondary + "20" }]}>
          <TextInput
            style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity onPress={sendMessage} disabled={!inputText.trim()} style={styles.sendBtn}>
            <LinearGradient
              colors={inputText.trim() ? [colors.gradientStart, colors.gradientEnd] : [colors.textSecondary + "50", colors.textSecondary + "50"]}
              start={{ x:0, y:0 }} end={{ x:1, y:0 }}
              style={styles.sendBtnGradient}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container:        { flex: 1, backgroundColor: colors.background },
  header:           { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 14, paddingTop: 44 },
  headerBack:       { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerTitle:      { color: "#fff", fontSize: 16, fontWeight: "bold" },
  headerSub:        { color: "rgba(255,255,255,0.8)", fontSize: 11 },
  messagesList:     { padding: 16, paddingBottom: 8 },
  inputRow:         { flexDirection: "row", alignItems: "flex-end", padding: 10, borderTopWidth: 1, gap: 8 },
  input:            { flex: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, maxHeight: 100 },
  sendBtn:          { borderRadius: 20, overflow: "hidden" },
  sendBtnGradient:  { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20 },
  emptyIcon:        { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  emptyTitle:       { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  emptySubtitle:    { fontSize: 14, textAlign: "center", lineHeight: 22, marginHorizontal: 32, marginBottom: 32 },
  emptyBtn:         { borderRadius: 12, overflow: "hidden", width: "70%" },
  emptyBtnGradient: { padding: 16, alignItems: "center" },
  emptyBtnText:     { color: "#fff", fontWeight: "bold", fontSize: 15 },
});