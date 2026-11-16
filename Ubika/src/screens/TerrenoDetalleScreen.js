import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, Image,
  TouchableOpacity, Modal, TextInput, Dimensions, Alert, ActivityIndicator
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import GradientButton from "../components/GradientButton";
import api from "../api/axios";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- IMPORTANTE: Lo necesitamos para saber quién eres

export default function TerrenoDetalleScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const { terrenoId } = route.params; 

  const [terreno, setTerreno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // <-- NUEVO ESTADO: ¿Soy el dueño?
  
  const [modalOpen, setModalOpen] = useState(false);
  const [mensajeInscripcion, setMensajeInscripcion] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    const fetchTerreno = async () => {
      try {
        const response = await api.get(`/foro/${terrenoId}`);
        const data = response.data.foro || response.data.data || response.data;
        setTerreno(data);

        // --- LÓGICA PARA SABER SI ERES EL DUEÑO ---
        // 1. Recuperamos tus datos del móvil
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          const currentUser = JSON.parse(userStr);
          
          // 2. Buscamos el ID del creador en los datos de Laravel
          const ownerId = data.user_id || data.user?.id || data.propietario_id || data.creador_id;

          // 3. Si tu ID coincide con el del dueño, activamos el modo propietario
          if (ownerId && String(currentUser.id) === String(ownerId)) {
            setIsOwner(true);
          }
        }

      } catch (error) {
        console.error("Error cargando detalle del foro:", error);
        Alert.alert("Error", "No se pudo conectar con el proyecto seleccionado.");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchTerreno();
  }, [terrenoId]);

  const handleSolicitarInscripcion = async () => {
    setSendingRequest(true);
    try {
      await api.post('/foro/unirse', {
        terreno_id: terrenoId, 
        mensaje: mensajeInscripcion
      });
      Alert.alert("¡Solicitud enviada!", "Tu petición para unirte ha sido registrada.");
      setModalOpen(false);
    } catch (error) {
      console.error("Error al unirse:", error.response?.data);
      Alert.alert("Aviso", "No se pudo enviar la solicitud.");
    } finally {
      setSendingRequest(false);
    }
  };

  const styles = createStyles(colors);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#E10012" />
        <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  if (!terreno) return null;

  const ownerName = terreno.user?.name || 
                    terreno.propietario?.name || 
                    terreno.creador?.name || 
                    terreno.nombre_propietario || 
                    "Propietario";

  const hasImage = terreno.image_url || terreno.imagen;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* CABECERA */}
        {hasImage ? (
          <View>
            <Image 
              source={{ uri: terreno.image_url || terreno.imagen }} 
              style={styles.heroImage} 
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noImageHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnStatic}>
              <Ionicons name="arrow-back" size={26} color={colors.text} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>
            {terreno.nombre || terreno.name || "Proyecto Ubika"}
          </Text>
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {terreno.ubicacion || terreno.location || "Ubicación pendiente"}
          </Text>

          {/* TARJETA DEL DUEÑO */}
          <View style={[styles.ownerCard, { backgroundColor: colors.card }]}>
            <Image 
              source={{ uri: terreno.user?.avatar || `https://ui-avatars.com/api/?name=${ownerName}&background=E10012&color=fff` }} 
              style={styles.ownerAvatar} 
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.ownerLabel, { color: colors.textSecondary }]}>Dueño del terreno</Text>
              <Text style={[styles.ownerName,  { color: colors.text }]}>{ownerName}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#E10012" />
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción del proyecto</Text>
          <Text style={[styles.description,  { color: colors.textSecondary }]}>
            {terreno.descripcion || terreno.description || "Este proyecto busca colaboradores para desarrollar una vivienda cooperativa bajo el modelo Ubika."}
          </Text>

          <View style={styles.valuesRow}>
            <View style={styles.valueItem}><Text style={styles.valueEmoji}>🤝</Text><Text style={[styles.valueText, { color: colors.text }]}>Unión</Text></View>
            <View style={styles.valueItem}><Text style={styles.valueEmoji}>🏠</Text><Text style={[styles.valueText, { color: colors.text }]}>Hogar</Text></View>
            <View style={styles.valueItem}><Text style={styles.valueEmoji}>📉</Text><Text style={[styles.valueText, { color: colors.text }]}>Ahorro</Text></View>
          </View>

          {/* CONDICIONAL: ¿MOSTRAR BOTÓN O ETIQUETA DE DUEÑO? */}
          <View style={styles.actionArea}>
            {!isOwner ? (
              <GradientButton
                title="Solicitar inscripción"
                onPress={() => setModalOpen(true)}
              />
            ) : (
              <View style={styles.isOwnerBadge}>
                <Ionicons name="star" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.isOwnerText}>Eres el propietario de este proyecto</Text>
              </View>
            )}
          </View>
          <View style={{ height: 30 }} />
        </View>
      </ScrollView>

      {/* MODAL (Solo se podrá abrir si NO eres el dueño) */}
      <Modal visible={modalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Enviar solicitud</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.primary, color: colors.text, backgroundColor: colors.background }]}
              placeholder="Escribe un mensaje al propietario..."
              placeholderTextColor={colors.textSecondary}
              multiline
              value={mensajeInscripcion}
              onChangeText={setMensajeInscripcion}
            />
            <GradientButton
              title={sendingRequest ? "Enviando..." : "Confirmar solicitud"}
              onPress={handleSolicitarInscripcion}
              disabled={sendingRequest}
            />
            <TouchableOpacity onPress={() => setModalOpen(false)} style={styles.cancelBtn}>
              <Text style={{ color: colors.textSecondary }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heroImage: { width: "100%", height: 260 },
  noImageHeader: { paddingTop: 50, paddingHorizontal: 20, marginBottom: 10 },
  backBtn: { position: "absolute", top: 44, left: 16, backgroundColor: "#fff", borderRadius: 20, width: 36, height: 36, alignItems: "center", justifyContent: "center", elevation: 5 },
  backBtnStatic: { width: 40, height: 40, justifyContent: "center" },
  backText: { fontSize: 18, fontWeight: "bold" },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  location: { fontSize: 14, marginBottom: 20 },
  ownerCard: { flexDirection: "row", alignItems: "center", borderRadius: 15, padding: 15, marginBottom: 20, elevation: 1 },
  ownerAvatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  ownerLabel: { fontSize: 10, textTransform: 'uppercase', marginBottom: 2 },
  ownerName: { fontSize: 15, fontWeight: "bold" },
  sectionTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 14, lineHeight: 22, marginBottom: 20 },
  valuesRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25, backgroundColor: colors.card, padding: 15, borderRadius: 12 },
  valueItem: { alignItems: 'center' },
  valueEmoji: { fontSize: 20, marginBottom: 3 },
  valueText: { fontSize: 10, fontWeight: 'bold' },
  
  actionArea: { marginTop: 10 },
  
  // ESTILOS PARA LA ETIQUETA DEL PROPIETARIO
  isOwnerBadge: {
    flexDirection: 'row',
    backgroundColor: '#E10012', // Rojo corporativo de Ubika
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E10012',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  isOwnerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.6)" },
  modalSheet: { borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 40 },
  modalTitle: { fontSize: 19, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, height: 90, marginBottom: 15, textAlignVertical: 'top' },
  cancelBtn: { marginTop: 20, alignItems: "center" },
});