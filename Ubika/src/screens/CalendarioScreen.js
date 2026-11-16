import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Modal,
  TextInput, Button, ScrollView, Platform, Alert, Keyboard,
  StatusBar, ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useTheme } from "../theme/ThemeProvider";
import api from "../api/axios";

export default function CalendarioScreen({ navigation }) {
  const { isDark } = useTheme();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("5 min antes");
  const [selectedDate, setSelectedDate] = useState(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [manualStartTime, setManualStartTime] = useState("");

  // ── Colores dinámicos ──
  const bg = isDark ? '#1a1a1a' : '#F5F0E8'; // Adaptado a tu fondo crema general
  const cardBg = isDark ? '#2a2a2a' : '#fff';
  const inputBg = isDark ? '#333' : '#fafafa';
  const inputBorder = isDark ? '#555' : '#ddd';
  const textPrimary = isDark ? '#fff' : '#2B2D4E';
  const textSecond = isDark ? '#aaa' : '#666';
  const textMuted = isDark ? '#777' : '#999';
  const borderColor = isDark ? '#444' : '#eee';

  // ── Normalización a prueba de balas (Frontend <-> Backend) ──
  const normalizeEvent = (raw) => {
    // Buscamos la fecha donde sea que Laravel la haya metido
    const rawDate = raw.fecha_hora || raw.fecha || raw.date || raw.start || raw.inicio || new Date().toISOString();
    
    // Arreglo vital para móviles: Reemplazar espacio por 'T' para evitar 'Invalid Date'
    const safeDateString = typeof rawDate === 'string' ? rawDate.replace(' ', 'T') : rawDate;
    const startDate = new Date(safeDateString);
    
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    
    return {
      id: raw.id,
      title: raw.titulo ?? raw.nombre ?? raw.title ?? "Evento sin título",
      description: raw.descripcion ?? raw.description ?? "",
      reminder: raw.reminder ?? raw.recordatorio ?? "5 min antes",
      start: isNaN(startDate) ? new Date() : startDate,
      end: isNaN(endDate) ? new Date() : endDate,
    };
  };

  const toLaravelDate = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  };

  // ── API Calls ──
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Cargando eventos desde /calendario...");
      const response = await api.get("/calendario");
      const rawData = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
      setEvents(rawData.map(normalizeEvent));
    } catch (error) {
      console.log("Error GET /calendario:", error.response?.status, error.response?.data);
      if (error.response?.status === 404) {
         console.log("La ruta /calendario no existe. Revisa api.php en Laravel.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const saveEvent = async () => {
    if (!title.trim()) { Alert.alert("Requerido", "Ingresa un título"); return; }

    // Enviamos múltiples formatos para que Laravel coja el que le guste
    const payload = {
      titulo: title.trim(),
      descripcion: description.trim(),
      fecha_hora: toLaravelDate(start), 
      fecha: toLaravelDate(start).split(' ')[0], // Por si pide solo fecha
      hora: formatTimeInput(start),              // Por si pide solo hora
      reminder: reminder 
    };

    setSaving(true);
    try {
      if (editingId) {
        const res = await api.put(`/calendario/${editingId}`, payload);
        setEvents(prev => prev.map(e => e.id === editingId ? normalizeEvent(res.data) : e));
      } else {
        const res = await api.post("/calendario", payload);
        // Si Laravel no devuelve el evento creado, al menos recargamos la lista
        if (res.data && res.data.id) {
          setEvents(prev => [...prev, normalizeEvent(res.data)]);
        } else {
          fetchEvents(); 
        }
      }
      setModalVisible(false);
      resetForm();
    } catch (error) {
      // 🕵️‍♀️ RASTREADOR DE ERRORES EXACTOS
      console.log("\n================ ERROR AL GUARDAR EVENTO ================");
      console.log("Ruta:", error.config?.url);
      console.log("Status:", error.response?.status);
      console.log("Laravel dice:", JSON.stringify(error.response?.data, null, 2));
      console.log("=========================================================\n");

      if (error.response?.status === 422) {
        Alert.alert("Faltan campos", "Revisa el log de VS Code para ver qué exige Laravel.");
      } else if (error.response?.status === 404) {
        Alert.alert("Ruta no encontrada", "El endpoint no existe en el backend.");
      } else {
        Alert.alert("Error", "No se pudo guardar el evento.");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = (id) => {
    Alert.alert("Eliminar", "¿Confirmas eliminar este evento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/calendario/${id}`);
            setEvents(prev => prev.filter(e => e.id !== id));
          } catch (error) {
            console.log("Error al borrar:", error.response?.data);
            Alert.alert("Error", "No se pudo eliminar el evento");
          }
        }
      }
    ]);
  };

  // ── Helpers UI ──
  const formatTimeInput = (date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const openModal = (eventToEdit = null) => {
    if (eventToEdit) {
      setEditingId(eventToEdit.id);
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setReminder(eventToEdit.reminder);
      setStart(eventToEdit.start);
      setManualStartTime(formatTimeInput(eventToEdit.start));
    } else {
      setEditingId(null);
      const base = selectedDate ? new Date(selectedDate + "T09:00:00") : new Date();
      base.setHours(9, 0, 0);
      setTitle(""); setDescription(""); setReminder("5 min antes");
      setStart(base);
      setManualStartTime(formatTimeInput(base));
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setTitle(""); setDescription(""); setEditingId(null);
  };

  const handleStartChange = (event, date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (!date) return;
    setStart(date); setManualStartTime(formatTimeInput(date));
  };

  // ── Render Helpers ──
  const getMarkedDates = () => {
    const marked = {};
    events.forEach(ev => {
      // Usamos formatación segura
      const year = ev.start.getFullYear();
      const month = String(ev.start.getMonth() + 1).padStart(2, '0');
      const day = String(ev.start.getDate()).padStart(2, '0');
      const k = `${year}-${month}-${day}`;
      
      marked[k] = { marked: true, dotColor: '#CC0000', selected: selectedDate === k, selectedColor: '#CC0000' };
    });
    return marked;
  };

  const renderTimeSelector = (label, date, manualTime, onManualChange, onPickerPress, showPicker, onPickerChange) => (
    <View style={styles.timeSelectorContainer}>
      <Text style={[styles.timeLabel, { color: textSecond }]}>{label}</Text>
      <View style={styles.timeRow}>
        <TextInput
          style={[styles.timeInput, { flex: 1, backgroundColor: inputBg, borderColor: inputBorder, color: textPrimary }]}
          value={manualTime} onChangeText={onManualChange}
          placeholder="HH:MM" placeholderTextColor={textMuted}
          keyboardType="numeric" maxLength={5}
        />
        <TouchableOpacity onPress={onPickerPress} style={[styles.pickerButton, { backgroundColor: cardBg, borderColor: inputBorder }]}>
          <MaterialCommunityIcons name="clock-outline" size={22} color="#CC0000" />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker value={date} mode="time" is24Hour={true} onChange={onPickerChange} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
      <View style={[styles.container, { backgroundColor: bg }]}>

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: textPrimary }]}>CALENDARIO</Text>
          <TouchableOpacity onPress={() => openModal()} style={styles.addButton}>
            <MaterialCommunityIcons name="plus-circle" size={32} color="#CC0000" />
          </TouchableOpacity>
        </View>

        <Calendar
          theme={{
            calendarBackground: bg,
            textSectionTitleColor: textSecond,
            selectedDayBackgroundColor: '#CC0000',
            todayTextColor: '#CC0000',
            dayTextColor: textPrimary,
            monthTextColor: textPrimary,
            arrowColor: '#CC0000',
          }}
          markedDates={getMarkedDates()}
          onDayPress={(day) => setSelectedDate(day.dateString)}
        />

        <View style={styles.eventsSection}>
          <Text style={[styles.eventsTitle, { color: textPrimary }]}>
            {selectedDate ? `Eventos del ${selectedDate}` : 'Próximos eventos'}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#CC0000" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={selectedDate ? events.filter(e => {
                const year = e.start.getFullYear();
                const month = String(e.start.getMonth() + 1).padStart(2, '0');
                const day = String(e.start.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}` === selectedDate;
              }) : events}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text style={{ color: textMuted, textAlign: 'center', marginTop: 20 }}>No hay eventos.</Text>}
              renderItem={({ item }) => (
                <View style={[styles.eventCard, { backgroundColor: cardBg }]}>
                  <View style={styles.eventHeader}>
                    <Text style={[styles.eventTitle, { color: textPrimary }]}>{item.title}</Text>
                    <View style={styles.eventActions}>
                      <TouchableOpacity onPress={() => openModal(item)} style={{ marginRight: 15 }}>
                        <MaterialCommunityIcons name="pencil-outline" size={20} color={textSecond} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteEvent(item.id)}>
                        <MaterialCommunityIcons name="trash-can-outline" size={20} color="#CC0000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.eventTime}>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={14} color={textSecond} />
                    <Text style={[styles.eventTimeText, { color: textSecond }]}>
                      {item.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                  {item.description ? <Text style={[styles.eventDescription, { color: textSecond }]}>{item.description}</Text> : null}
                </View>
              )}
            />
          )}
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
              <View style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
                <Text style={[styles.modalTitle, { color: textPrimary }]}>{editingId ? 'Editar Evento' : 'Nuevo Evento'}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialCommunityIcons name="close" size={26} color={textSecond} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.label, { color: textSecond }]}>Título *</Text>
                <TextInput
                  placeholder="Ej: Reunión cooperativa" value={title} onChangeText={setTitle}
                  style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: textPrimary }]}
                  placeholderTextColor={textMuted}
                />

                {renderTimeSelector("Hora de inicio", start, manualStartTime, setManualStartTime,
                  () => setShowStartPicker(true), showStartPicker, handleStartChange)}

                <Text style={[styles.label, { color: textSecond }]}>Descripción</Text>
                <TextInput
                  placeholder="Añade detalles..."
                  value={description} onChangeText={setDescription}
                  style={[styles.input, styles.textArea, { backgroundColor: inputBg, borderColor: inputBorder, color: textPrimary }]}
                  multiline numberOfLines={3} placeholderTextColor={textMuted}
                />

                <View style={styles.modalButtons}>
                  {saving ? (
                    <ActivityIndicator color="#CC0000" size="large" />
                  ) : (
                    <TouchableOpacity 
                      style={{ backgroundColor: '#CC0000', padding: 15, borderRadius: 10, alignItems: 'center' }} 
                      onPress={saveEvent}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Guardar Evento</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: "bold", letterSpacing: 1 },
  backButton: { padding: 4 },
  addButton: { padding: 4 },
  eventsSection: { flex: 1, padding: 20 },
  eventsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 15, textTransform: 'uppercase' },
  eventCard: { borderRadius: 12, padding: 15, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#CC0000', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 } },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventActions: { flexDirection: 'row', alignItems: 'center' },
  eventTime: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  eventTimeText: { fontSize: 13, marginLeft: 5 },
  eventDescription: { fontSize: 14, marginTop: 5, lineHeight: 20 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 40, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1 },
  modalTitle: { fontSize: 19, fontWeight: 'bold' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 18, fontSize: 15 },
  textArea: { height: 90, textAlignVertical: 'top' },
  label: { marginBottom: 8, fontWeight: '700', fontSize: 13 },
  timeSelectorContainer: { marginBottom: 18 },
  timeLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  timeRow: { flexDirection: 'row', gap: 10 },
  timeInput: { borderWidth: 1, borderRadius: 10, padding: 12, textAlign: 'center', fontSize: 15 },
  pickerButton: { padding: 12, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  modalButtons: { marginTop: 15, marginBottom: 10 }
});