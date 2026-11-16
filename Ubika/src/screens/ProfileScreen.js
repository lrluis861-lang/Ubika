// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useTheme } from "../theme/ThemeProvider";
// import GradientButton from "../components/GradientButton";
// import { useTerrenos } from "../context/TerrenosContext";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from '@expo/vector-icons';
// // import { getUser } from "../api/auth";
// import { getProfile, updateProfile } from "../api/profile";
// import { useEffect } from "react";


// const { width } = Dimensions.get("window");

// // ── Datos mock ────────────────────────────────────────────────────
// const INITIAL_USER = {
//   name: "",
//   email: "",
//   bio: "",
//   avatar: "https://i.pravatar.cc/200",
// };

// const INTERESTS_OPTIONS = [
//   "Terreno urbano", "Finca rustica", "Solar industrial",
//   "Parcela residencial", "Terreno agricola", "Zona costera",
//   "Suelo comercial", "Huerta", "Monte y bosque", "Zona turistica",
// ];

// // const INITIAL_TERRENOS = [
// //   { id: "1", name: "Solar Centro", location: "Madrid",   size: "320m2",  status: "owned",    image: "https://picsum.photos/seed/t1/400/200" },
// //   { id: "2", name: "Finca Norte",  location: "Burgos",   size: "1.2Ha",  status: "reserved", image: "https://picsum.photos/seed/t2/400/200" },
// //   { id: "3", name: "Parcela Sur",  location: "Sevilla",  size: "540m2",  status: "owned",    image: "https://picsum.photos/seed/t3/400/200" },
// //   { id: "4", name: "Lote Este",    location: "Valencia", size: "210m2",  status: "owned",    image: "https://picsum.photos/seed/t4/400/200" },
// // ];

// const INITIAL_PLANES  = ["Casa 2027", "Local comercial 2028"];
// const INITIAL_LOGROS  = ["Primer terreno comprado", "Plan completado al 50%", "Meta de ahorro superada"];

// // ══════════════════════════════════════════════════════════════════
// // SUBCOMPONENTES
// // ══════════════════════════════════════════════════════════════════

// // Badge estado terreno
// function StatusBadge({ status }) {
//   const isReserved = status === "reserved";
//   return (
//     <View style={[badgeS.badge, isReserved ? badgeS.reserved : badgeS.owned]}>
//       <Text style={badgeS.text}>{isReserved ? "Reservado" : "En propiedad"}</Text>
//     </View>
//   );
// }
// const badgeS = StyleSheet.create({
//   badge:    { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
//   owned:    { backgroundColor: "#22c55e" },
//   reserved: { backgroundColor: "#f59e0b" },
//   text:     { color: "#fff", fontSize: 11, fontWeight: "bold" },
// });

// // Card terreno con imagen
// function TerrenoCard({ item, colors }) {
//   return (
//     <View style={[tS.card, { backgroundColor: colors.card }]}>
//       <Image source={{ uri: item.image }} style={tS.image} />
//       <View style={tS.body}>
//         <View style={tS.row}>
//           <View style={{ flex: 1, marginRight: 8 }}>
//             <Text style={[tS.name, { color: colors.text }]}>{item.name}</Text>
//             <Text style={[tS.sub,  { color: colors.textSecondary }]}>{item.location}  ·  {item.size}</Text>
//           </View>
//           <StatusBadge status={item.status} />
//         </View>
//       </View>
//     </View>
//   );
// }
// const tS = StyleSheet.create({
//   card:  { borderRadius: 12, marginBottom: 10, marginHorizontal: 16, overflow: "hidden" },
//   image: { width: "100%", height: 130 },
//   body:  { padding: 12 },
//   row:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   name:  { fontWeight: "bold", fontSize: 14, marginBottom: 2 },
//   sub:   { fontSize: 12 },
// });

// // Info row
// function InfoRow({ label, value, colors }) {
//   return (
//     <View style={[iS.row, { borderBottomColor: colors.textSecondary + "30" }]}>
//       <Text style={[iS.label, { color: colors.textSecondary }]}>{label}</Text>
//       <Text style={[iS.value, { color: colors.text }]}>{value}</Text>
//     </View>
//   );
// }
// const iS = StyleSheet.create({
//   row:   { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1 },
//   label: { fontSize: 13 },
//   value: { fontSize: 13, fontWeight: "600" },
// });

// // ══════════════════════════════════════════════════════════════════
// // MODAL: EDITAR PERFIL
// // ══════════════════════════════════════════════════════════════════
// function EditProfileModal({ visible, onClose, user, onSave, colors }) {

//   const [form, setForm] = useState({
//     name: user.name || "",
//     email: user.email || "",
//     bio: user.bio || "",
//   });

//   useEffect(() => {
//     setForm({
//       name: user.name || "",
//       email: user.email || "",
//       bio: user.bio || "",
//     });
//   }, [user]);

//   const set = (key, value) => {
//     setForm(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={mS.overlay}>
//         <View style={[mS.sheet, { backgroundColor: colors.card }]}>

//           <Text style={[mS.title, { color: colors.text }]}>
//             Editar perfil
//           </Text>

//           <Text style={[mS.label, { color: colors.textSecondary }]}>
//             Nombre
//           </Text>

//           <TextInput
//             style={[
//               mS.input,
//               {
//                 borderColor: colors.primary,
//                 color: colors.text,
//                 backgroundColor: colors.background,
//               }
//             ]}
//             value={form.name}
//             onChangeText={(v) => set("name", v)}
//             placeholder="Nombre"
//             placeholderTextColor={colors.textSecondary}
//           />

//           <Text style={[mS.label, { color: colors.textSecondary }]}>
//             Email
//           </Text>

//           <TextInput
//             style={[
//               mS.input,
//               {
//                 borderColor: colors.primary,
//                 color: colors.text,
//                 backgroundColor: colors.background,
//               }
//             ]}
//             value={form.email}
//             onChangeText={(v) => set("email", v)}
//             placeholder="Email"
//             keyboardType="email-address"
//             placeholderTextColor={colors.textSecondary}
//           />

//           <Text style={[mS.label, { color: colors.textSecondary }]}>
//             Biografía
//           </Text>

//           <TextInput
//             multiline
//             style={[
//               mS.input,
//               {
//                 height: 90,
//                 borderColor: colors.primary,
//                 color: colors.text,
//                 backgroundColor: colors.background,
//               }
//             ]}
//             value={form.bio}
//             onChangeText={(v) => set("bio", v)}
//             placeholder="Biografía"
//             placeholderTextColor={colors.textSecondary}
//           />

//           <GradientButton
//             title="Guardar cambios"
//             onPress={() => onSave(form)}
//             style={{ marginTop: 16 }}
//           />

//           <TouchableOpacity
//             onPress={onClose}
//             style={mS.cancel}
//           >
//             <Text style={{ color: colors.textSecondary }}>
//               Cancelar
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     </Modal>
//   );
// }

// // ══════════════════════════════════════════════════════════════════
// // MODAL: FOTO (avatar)
// // ══════════════════════════════════════════════════════════════════
// function ChangePhotoModal({ visible, onClose, colors }) {
//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={mS.overlay}>
//         <View style={[mS.sheet, { backgroundColor: colors.card, paddingBottom: 40 }]}>
//           <Text style={[mS.title, { color: colors.text }]}>Cambiar Foto</Text>
//           <GradientButton title="Tomar foto"         onPress={onClose} style={{ marginBottom: 12 }} />
//           <GradientButton title="Elegir de galeria"  onPress={onClose} style={{ marginBottom: 12 }} />
//           <TouchableOpacity onPress={onClose} style={mS.cancel}>
//             <Text style={{ color: colors.textSecondary }}>Cancelar</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// // ══════════════════════════════════════════════════════════════════
// // MODAL: PLANES y LOGROS (reutilizable)
// // ══════════════════════════════════════════════════════════════════
// function ListEditorModal({ visible, onClose, title, items, onSave, colors }) {
//   const [list,    setList]    = useState([...items]);
//   const [newItem, setNewItem] = useState("");

//   const addItem = () => {
//     const trimmed = newItem.trim();
//     if (!trimmed) return;
//     setList(prev => [...prev, trimmed]);
//     setNewItem("");
//   };

//   const removeItem = (index) => {
//     setList(prev => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={mS.overlay}>
//         <View style={[mS.sheet, { backgroundColor: colors.card, paddingBottom: 40, maxHeight: "80%" }]}>
//           <Text style={[mS.title, { color: colors.text }]}>{title}</Text>

//           {/* Lista actual */}
//           <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
//             {list.map((item, index) => (
//               <View key={index} style={[leS.row, { borderBottomColor: colors.textSecondary + "25" }]}>
//                 <Text style={[leS.itemText, { color: colors.text }]} numberOfLines={1}>{item}</Text>
//                 <TouchableOpacity onPress={() => removeItem(index)} style={[leS.deleteBtn, { backgroundColor: "#ef444420" }]}>
//                   <Text style={leS.deleteText}>Eliminar</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//             {list.length === 0 && (
//               <Text style={[leS.empty, { color: colors.textSecondary }]}>Sin elementos</Text>
//             )}
//           </ScrollView>

//           {/* Añadir nuevo */}
//           <View style={leS.addRow}>
//             <TextInput
//               style={[leS.input, { borderColor: colors.primary, color: colors.text, backgroundColor: colors.background, flex: 1 }]}
//               value={newItem}
//               onChangeText={setNewItem}
//               placeholder={`Nuevo ${title.toLowerCase()}...`}
//               placeholderTextColor={colors.textSecondary}
//               onSubmitEditing={addItem}
//             />
//             <TouchableOpacity
//               onPress={addItem}
//               style={[leS.addBtn, { backgroundColor: colors.primary }]}
//             >
//               <Text style={leS.addBtnText}>+</Text>
//             </TouchableOpacity>
//           </View>

//           <GradientButton title="Guardar" onPress={() => { onSave(list); onClose(); }} style={{ marginTop: 12 }} />
//           <TouchableOpacity onPress={onClose} style={mS.cancel}>
//             <Text style={{ color: colors.textSecondary }}>Cancelar</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }
// const leS = StyleSheet.create({
//   row:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1 },
//   itemText:   { flex: 1, fontSize: 13, marginRight: 8 },
//   deleteBtn:  { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
//   deleteText: { color: "#ef4444", fontSize: 12, fontWeight: "600" },
//   empty:      { fontSize: 13, textAlign: "center", paddingVertical: 16 },
//   addRow:     { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 14 },
//   input:      { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 13 },
//   addBtn:     { width: 40, height: 40, borderRadius: 8, alignItems: "center", justifyContent: "center" },
//   addBtnText: { color: "#fff", fontSize: 22, fontWeight: "bold", lineHeight: 26 },
// });

// const mS = StyleSheet.create({
//   overlay:         { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
//   sheet:           { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: "92%" },
//   title:           { fontSize: 18, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
//   section:         { fontSize: 14, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
//   label:           { fontSize: 12, marginBottom: 4 },
//   hint:            { fontSize: 11, marginBottom: 8 },
//   input:           { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 13 },
//   toggle:          { flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
//   toggleText:      { fontSize: 13 },
//   toggleValue:     { fontSize: 13, fontWeight: "bold" },
//   cancel:          { alignItems: "center", marginTop: 12, padding: 8 },
//   interestsGrid:   { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
//   interestChip:    { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
//   interestChipText:{ fontSize: 12, fontWeight: "500" },
// });

// // ══════════════════════════════════════════════════════════════════
// // PANTALLA PRINCIPAL
// // ══════════════════════════════════════════════════════════════════
// export default function ProfileScreen() {
//   const { theme }  = useTheme();
//   const { colors } = theme;

//   const [user,          setUser]          = useState(INITIAL_USER);
//   // const [terrenos]                        = useState(INITIAL_TERRENOS);
//   const { terrenos } = useTerrenos();
//   const [planes,        setPlanes]        = useState(INITIAL_PLANES);
//   const [logros,        setLogros]        = useState(INITIAL_LOGROS);

//   const [editVisible,   setEditVisible]   = useState(false);
//   const [photoVisible,  setPhotoVisible]  = useState(false);
//   const [planesVisible, setPlanesVisible] = useState(false);
//   const [logrosVisible, setLogrosVisible] = useState(false);

//   // Cargar datos reales del usuario al entrar
//     useEffect(() => {
//       const cargarPerfil = async () => {
//         try {
//           const data = await getProfile();
    
//           console.log("PROFILE:", data);
    
//           setUser({
//             name: data.name || "",
//             email: data.email || "",
//             bio: data.bio || "",
//             avatar: data.avatar || "https://i.pravatar.cc/200",
//           });
    
//         } catch (error) {
//           console.log("STATUS:", error.response?.status);
//           console.log("DATA:", error.response?.data);
    
//           Alert.alert(
//             "Error",
//             "No se pudo cargar el perfil"
//           );
//         }
//       };
    
//       cargarPerfil();
//     }, []);

//   const s = createStyles(colors);
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={s.container}>

//       {/* HEADER */}
//       <LinearGradient 
//         colors={["#E10012", "#2E4057"]}
//         style={s.header}
//       >
//         {/* BOTON VOLVER */}
//         <TouchableOpacity 
//           style={s.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons 
//             name="arrow-back" 
//             size={26} 
//             color="#fff" // o colors.text
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setPhotoVisible(true)}>
//           <Image source={{ uri: user.avatar }} style={s.avatar} />
//           <View style={s.cameraIcon}>
//             <Text style={s.cameraText}>+</Text>
//           </View>
//         </TouchableOpacity>
        
//         <Text style={s.name}>{user.name}</Text>
//         <Text style={s.bio}>{user.bio}</Text>
//       </LinearGradient>

//       {/* STATS — Planes y Logros editables */}
//       <View style={s.statsContainer}>
//         <TouchableOpacity style={s.stat} onPress={() => setPlanesVisible(true)}>
//           <Text style={s.statNumber}>{planes.length}</Text>
//           <Text style={s.statLabel}>Planes</Text>
//           <Text style={s.statEdit}>Editar</Text>
//         </TouchableOpacity>

//         <View style={s.statDivider} />

//         <TouchableOpacity style={s.stat} onPress={() => setLogrosVisible(true)}>
//           <Text style={s.statNumber}>{logros.length}</Text>
//           <Text style={s.statLabel}>Logros</Text>
//           <Text style={s.statEdit}>Editar</Text>
//         </TouchableOpacity>
//       </View>

//       {/* BOTON EDITAR */}
//       <View style={s.actions}>
//         <GradientButton title="Editar Perfil" onPress={() => setEditVisible(true)} style={s.button} />
//       </View>

//       {/* INFO PERSONAL */}
//       <Text style={s.sectionTitle}>Informacion personal</Text>
//       <View style={[s.card, { paddingHorizontal: 16, paddingVertical: 4 }]}>
//         <InfoRow label="Edad"        value={`${user.age} anos`}           colors={colors} />
//         <InfoRow label="Sexo"        value={user.sex}                      colors={colors} />
//         <InfoRow label="Ubicacion"   value={user.location}                 colors={colors} />
//         <InfoRow label="Presupuesto" value={user.budget}                   colors={colors} />
//         <InfoRow label="Hijos"       value={user.children ? "Si" : "No"}  colors={colors} />
//         <InfoRow label="Mascotas"    value={user.pets     ? "Si" : "No"}  colors={colors} />
//         <InfoRow label="Email"       value={user.email}                    colors={colors} />
//       </View>

//       {/* INTERESES */}
//       {(user.interests || []).length > 0 ? (
//         (user.interests || []).map((i) => (
//           <View key={i} style={[s.interestTag, { borderColor: colors.primary }]}>
//             <Text style={{ color: colors.primary, fontSize: 12 }}>{i}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
//           Sin intereses seleccionados
//         </Text>
//       )}

//       {/* PLANES */}
//       <View style={s.sectionRow}>
//         <Text style={s.sectionTitle}>Mis Planes</Text>
//         <TouchableOpacity onPress={() => setPlanesVisible(true)}>
//           <Text style={[s.sectionLink, { color: colors.primary }]}>Gestionar</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={s.card}>
//         {planes.map((p, i) => (
//           <Text key={i} style={[s.listItem, { color: colors.text, borderBottomColor: colors.textSecondary + "25", borderBottomWidth: i < planes.length - 1 ? 1 : 0 }]}>
//             {p}
//           </Text>
//         ))}
//         {planes.length === 0 && <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Sin planes activos</Text>}
//       </View>

//       {/* LOGROS */}
//       <View style={s.sectionRow}>
//         <Text style={s.sectionTitle}>Mis Logros</Text>
//         <TouchableOpacity onPress={() => setLogrosVisible(true)}>
//           <Text style={[s.sectionLink, { color: colors.primary }]}>Gestionar</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={s.card}>
//         {logros.map((l, i) => (
//           <Text key={i} style={[s.listItem, { color: colors.text, borderBottomColor: colors.textSecondary + "25", borderBottomWidth: i < logros.length - 1 ? 1 : 0 }]}>
//             {l}
//           </Text>
//         ))}
//         {logros.length === 0 && <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Sin logros aun</Text>}
//       </View>

//       {/* TERRENOS */}
//       <Text style={s.sectionTitle}>Mis Terrenos</Text>
//       <FlatList
//         data={terrenos.slice(0, 1)}
//         keyExtractor={(item) => item.id}
//         scrollEnabled={false}
//         renderItem={({ item }) => <TerrenoCard item={item} colors={colors} />}
//       />

//       <View style={{ height: 40 }} />

//       {/* MODALES */}
//       <EditProfileModal
//         visible={editVisible}
//         onClose={() => setEditVisible(false)}
//         user={user}
//         onSave={async (updated) => {
//           try {
        
//             await updateProfile(updated);
        
//             setUser(prev => ({
//               ...prev,
//               ...updated,
//             }));
        
//             setEditVisible(false);
        
//             Alert.alert(
//               "Perfil actualizado",
//               "Los cambios se han guardado correctamente"
//             );
        
//           } catch (error) {
        
//             console.log("STATUS:", error.response?.status);
//             console.log("DATA:", error.response?.data);
        
//             Alert.alert(
//               "Error",
//               "No se pudo actualizar el perfil"
//             );
//           }
//         }}
//         colors={colors}
//       />
//       <ChangePhotoModal
//         visible={photoVisible}
//         onClose={() => setPhotoVisible(false)}
//         colors={colors}
//       />
//       <ListEditorModal
//         visible={planesVisible}
//         onClose={() => setPlanesVisible(false)}
//         title="Planes"
//         items={planes}
//         onSave={setPlanes}
//         colors={colors}
//       />
//       <ListEditorModal
//         visible={logrosVisible}
//         onClose={() => setLogrosVisible(false)}
//         title="Logros"
//         items={logros}
//         onSave={setLogros}
//         colors={colors}
//       />
//     </ScrollView>
//   );
// }

// const createStyles = (colors) => StyleSheet.create({
//   container:      { flex: 1, backgroundColor: colors.background },
//   header:         { alignItems: "center", paddingVertical: 36, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
//   avatar:         { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#fff", marginBottom: 8 },
//   cameraIcon:     { position: "absolute", bottom: 8, right: 0, backgroundColor: "#fff", borderRadius: 10, width: 22, height: 22, alignItems: "center", justifyContent: "center" },
//   cameraText:     { fontWeight: "bold", fontSize: 16, color: "#555" },
//   name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
// bio:  { color: "#fff", opacity: 0.85, marginTop: 2, fontSize: 13 },
//   statsContainer: { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginVertical: 16, marginHorizontal: 16, backgroundColor: colors.card, borderRadius: 14, paddingVertical: 14 },
//   stat:           { alignItems: "center", flex: 1 },
//   statNumber:     { fontSize: 20, fontWeight: "bold", color: colors.text },
//   statLabel:      { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
//   statEdit:       { color: colors.primary, fontSize: 11, marginTop: 2 },
//   statDivider:    { width: 1, height: 36, backgroundColor: colors.textSecondary + "30" },
//   actions:        { marginHorizontal: 16, marginBottom: 16 },
//   button:         { width: "100%" },
//   sectionRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginBottom: 6, marginTop: 4 },
//   sectionTitle:   { fontSize: 14, fontWeight: "bold", color: colors.text, marginHorizontal: 16, marginBottom: 6, marginTop: 4 },
//   sectionLink:    { fontSize: 12, fontWeight: "600" },
//   card:           { backgroundColor: colors.card, marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 12 },
//   listItem:       { fontSize: 13, paddingVertical: 9 },
//   interestTag:    { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
//   backButton: {
//     position: "absolute",
//     top: 40,
//     left: 20,
//     zIndex: 10,
//   },
//   backText: {
//     fontSize: 22,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Image, ScrollView,
  Alert, TouchableOpacity, ActivityIndicator, Modal, TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeProvider";
import GradientButton from "../components/GradientButton";
import { Ionicons } from '@expo/vector-icons';
import api from "../api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { colors } = theme;
  
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);

  // Formulario de edición
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      console.log("Intentando cargar: /profile");
      const res = await api.get('/profile');
      setUser(res.data);
      setFormName(res.data.name || "");
      setFormEmail(res.data.email || "");
    } catch (error) {
      // ESTO NOS DIRÁ EL ERROR REAL DEL PRIMER INTENTO
      console.log("FALLO EN /profile -> Status:", error.response?.status, "Data:", error.response?.data);
      
      try {
        console.log("Intentando Plan B: /user");
        const userRes = await api.get('/user');
        setUser(userRes.data);
        setFormName(userRes.data.name || "");
        setFormEmail(userRes.data.email || "");
      } catch (fallbackError) {
        // ESTO NOS DIRÁ EL ERROR REAL DEL SEGUNDO INTENTO
        console.log("FALLO EN /user -> Status:", fallbackError.response?.status, "Data:", fallbackError.response?.data);
        
        console.log("Error crítico: No se pudo cargar nada.");
        Alert.alert("Error de Sincronización", `No se pudo cargar el perfil. Servidor respondió con: ${fallbackError.response?.status || 'Error de Red'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await api.put('/profile', {
        name: formName,
        email: formEmail,
      });
      setUser(res.data);
      setEditVisible(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios en el servidor");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.log("Sesión ya cerrada en el servidor");
    }
    await AsyncStorage.removeItem('token'); 
    await AsyncStorage.removeItem('user');
    navigation.replace("Login");
  };

  const s = createStyles(colors);

  if (loading) return (
    <View style={[s.container, { justifyContent: 'center' }]}>
      <ActivityIndicator size="large" color="#E10012" />
    </View>
  );

  return (
    <ScrollView style={s.container}>
      {/* HEADER */}
      <LinearGradient colors={["#E10012", "#2E4057"]} style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        
        <Image 
          source={{ uri: user.avatar || "https://ui-avatars.com/api/?name=" + (user.name || "U") }} 
          style={s.avatar} 
        />
        <Text style={s.name}>{user.name || "Usuario Ubika"}</Text>
        <Text style={s.bio}>{user.email || ""}</Text>
      </LinearGradient>

      {/* ACCIONES */}
      <View style={s.actions}>
        <GradientButton title="Editar Perfil" onPress={() => setEditVisible(true)} style={s.button} />
      </View>

      {/* INFO DEL USUARIO */}
      <Text style={s.sectionTitle}>Información de la cuenta</Text>
      <View style={s.card}>
        <InfoRow label="Nombre" value={user.name} colors={colors} />
        <InfoRow label="Email" value={user.email} colors={colors} />
        <InfoRow label="Rol" value={user.role || "Miembro"} colors={colors} />
        {/* Mostramos campos del perfil solo si existen */}
        {user.age && <InfoRow label="Edad" value={user.age + " años"} colors={colors} />}
        {user.location && <InfoRow label="Ubicación" value={user.location} colors={colors} />}
      </View>

      {/* CERRAR SESIÓN */}
      <View style={{ padding: 16, marginTop: 10 }}>
        <GradientButton title="Cerrar Sesión" onPress={handleLogout} />
      </View>

      {/* MODAL EDITAR */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={[s.modalSheet, { backgroundColor: colors.card }]}>
            <Text style={[s.modalTitle, { color: colors.text }]}>Editar perfil</Text>
            
            <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>Nombre completo</Text>
            <TextInput
              style={[s.input, { borderColor: colors.primary, color: colors.text, backgroundColor: colors.background }]}
              value={formName}
              onChangeText={setFormName}
            />

            <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>Correo electrónico</Text>
            <TextInput
              style={[s.input, { borderColor: colors.primary, color: colors.text, backgroundColor: colors.background }]}
              value={formEmail}
              onChangeText={setFormEmail}
              keyboardType="email-address"
            />

            <GradientButton title="Guardar cambios" onPress={handleUpdateProfile} style={{ marginTop: 16 }} />
            
            <TouchableOpacity onPress={() => setEditVisible(false)} style={s.cancelBtn}>
              <Text style={{ color: colors.textSecondary }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const InfoRow = ({ label, value, colors }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.textSecondary + "20" }}>
    <Text style={{ color: colors.textSecondary }}>{label}</Text>
    <Text style={{ color: colors.text, fontWeight: "bold" }}>{value || "No especificado"}</Text>
  </View>
);

const createStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: "center", paddingVertical: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: "#fff", marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  bio: { color: "#fff", opacity: 0.9, marginTop: 4, fontSize: 14 },
  actions: { paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  button: { width: "100%" },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: colors.text, marginHorizontal: 20, marginBottom: 10, marginTop: 15 },
  card: { backgroundColor: colors.card, marginHorizontal: 20, paddingHorizontal: 15, borderRadius: 15, elevation: 2 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.6)" },
  modalSheet: { borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 50 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 15 },
  cancelBtn: { marginTop: 20, alignItems: "center", padding: 10 }
});