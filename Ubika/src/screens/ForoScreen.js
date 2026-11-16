import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Image, TextInput, SafeAreaView, ActivityIndicator,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useForo }  from "../context/ForoContext";
import api from "../api/axios";

// TARJETA DEL TERRENO SÚPER MINIMALISTA (Sin imagen del terreno)
function TerrenoCard({ item, onPress, colors }) {
  // 1. Buscamos el nombre del dueño real
  const ownerName = item.user?.name || 
                    item.propietario?.name || 
                    item.propietario || 
                    item.owner || 
                    "Propietario Ubika";

  // Mantenemos el avatar del dueño en pequeñito para darle un toque humano
  const ownerAvatar = item.user?.avatar || 
                      item.ownerAvatar || 
                      `https://ui-avatars.com/api/?name=${ownerName}&background=E10012&color=fff`;

  // 2. Si no hay nombre de terreno, usamos el del dueño
  const terrainDisplayName = item.nombre || item.name || `Proyecto de ${ownerName}`;

  return (
    <TouchableOpacity
      style={[cS.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={cS.body}>
        {/* Etiqueta de tipo (Urbano, Rústico...) */}
        <View style={[cS.typeBadge, { borderColor: colors.primary }]}>
          <Text style={[cS.typeText, { color: colors.primary }]}>
            {item.tipo || item.type || "Terreno"}
          </Text>
        </View>

        {/* NOMBRE DEL PROYECTO */}
        <Text style={[cS.name, { color: colors.text }]}>{terrainDisplayName}</Text>
        
        {/* FILA DEL PROPIETARIO */}
        <View style={cS.ownerRow}>
          <Image source={{ uri: ownerAvatar }} style={cS.ownerAvatar} />
          <Text style={[cS.ownerName, { color: colors.textSecondary }]}>{ownerName}</Text>
        </View>
        
        {/* UBICACIÓN Y TAMAÑO */}
        <View style={cS.infoRow}>
          <Text style={[cS.infoItem, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.ubicacion || item.location || "Ubicación pendiente"}
          </Text>
          <Text style={[cS.infoItem, { color: colors.textSecondary }]}>
            {item.superficie || item.size || ""}
          </Text>
        </View>
        
        {/* PRECIO */}
        <Text style={[cS.price, { color: colors.primary }]}>
          {item.precio || item.price || "Consultar precio"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const cS = StyleSheet.create({
  card:        { borderRadius: 16, marginBottom: 16, overflow: "hidden", elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  body:        { padding: 18 }, // Un poco más de padding ahora que no hay imagen
  typeBadge:   { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start", marginBottom: 10 },
  typeText:    { fontSize: 10, fontWeight: "bold", textTransform: 'uppercase', letterSpacing: 0.5 },
  name:        { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  ownerRow:    { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  ownerAvatar: { width: 26, height: 26, borderRadius: 13, marginRight: 8, borderWidth: 1, borderColor: '#E10012' },
  ownerName:   { fontSize: 13, fontWeight: '500' },
  infoRow:     { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  infoItem:    { fontSize: 13 },
  price:       { fontSize: 22, fontWeight: "bold", marginTop: 4 },
});


export default function ForoScreen({ navigation }) {
  const { theme }  = useTheme();
  const { colors } = theme;
  const { terrenos: terrenosLocales } = useForo();

  const [terrenos,  setTerrenos]  = useState(terrenosLocales);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");

  useEffect(() => {
    const cargarForo = async () => {
      try {
        const response = await api.get('/foro');
        const datosForo = response.data.data || response.data;
        
        if (Array.isArray(datosForo)) {
          setTerrenos(datosForo);
        }
      } catch (error) {
        console.log("Usando datos locales por fallo en servidor");
        setTerrenos(terrenosLocales);
      } finally {
        setLoading(false);
      }
    };
    cargarForo();
  }, []);

  const filtrados = terrenos.filter(t => {
    const nombre    = (t.nombre || t.name || "").toLowerCase();
    const ubicacion = (t.ubicacion || t.location || "").toLowerCase();
    const buscador  = search.toLowerCase();
    return nombre.includes(buscador) || ubicacion.includes(buscador);
  });

  const styles = createStyles(colors);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#E10012" />
        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Buscando terrenos en Ubika...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[styles.backBtn, { backgroundColor: colors.background }]}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Explorar Proyectos</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>
            {filtrados.length} terrenos disponibles para cooperativas
          </Text>
        </View>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          /* BUSCADOR */
          <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            <Ionicons name="search" size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar por nombre o ciudad..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TerrenoCard
            item={item}
            colors={colors}
            onPress={() => navigation.navigate("TerrenoDetalle", { terrenoId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No hay resultados para tu búsqueda</Text>
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={[styles.resetText, { color: colors.primary }]}>Ver todos los terrenos</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// Importar Ionicons si no lo tienes arriba
import { Ionicons } from '@expo/vector-icons';

const createStyles = (colors) => StyleSheet.create({
  container:   { flex: 1, backgroundColor: colors.background },
  header:      { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: colors.textSecondary + "20", gap: 12 },
  backBtn:     { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", elevation: 1 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  headerSub:   { fontSize: 12, marginTop: 2 },
  list:        { padding: 16 },
  searchBox:   { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 14 },
  empty:       { alignItems: "center", paddingTop: 50 },
  emptyText:   { fontSize: 15, marginBottom: 10 },
  resetText:   { fontSize: 14, fontWeight: "bold" },
});