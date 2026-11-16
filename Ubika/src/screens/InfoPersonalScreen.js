// // import React, { useState } from "react";
// // import { LinearGradient } from "expo-linear-gradient";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// //   ActivityIndicator,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useTheme } from "../theme/ThemeProvider";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function InfoPersonalScreen({ navigation }) {
// //   const { theme } = useTheme();
// //   const { colors } = theme;
// //   const styles = createStyles(colors);

// //   const [capital,         setCapital]         = useState(5000);
// //   const [sexo,            setSexo]            = useState("");
// //   const [sexoCompanero,   setSexoCompanero]   = useState("");
// //   const [zonaResidencial, setZonaResidencial] = useState(null);
// //   const [ubicacion,       setUbicacion]       = useState("");
// //   const [edadMin,         setEdadMin]         = useState("");
// //   const [edadMax,         setEdadMax]         = useState("");
// //   const [loading,         setLoading]         = useState(false);

// //   const [poseeTerreno,        setPoseeTerreno]        = useState(null);
// //   const [terrenoUbicacion,    setTerrenoUbicacion]    = useState("");
// //   const [terrenoSuperficie,   setTerrenoSuperficie]   = useState("");
// //   const [terrenoPrecio,       setTerrenoPrecio]       = useState("");
// //   const [terrenoTipo,         setTerrenoTipo]         = useState("");
// //   const [terrenoCatastral,    setTerrenoCatastral]    = useState("");
// //   const [terrenoDescripcion,  setTerrenoDescripcion]  = useState("");
// //   const [terrenoCapacidad,    setTerrenoCapacidad]    = useState("");
// //   const [terrenoNPisos,       setTerrenoNPisos]       = useState("");

// //   const validarFormulario = () => {
// //     if (!sexo) { Alert.alert("Error", "Debes seleccionar tu sexo"); return false; }
// //     if (zonaResidencial === null) { Alert.alert("Error", "Debes seleccionar zona residencial"); return false; }
// //     if (zonaResidencial && !ubicacion.trim()) { Alert.alert("Error", "Debes ingresar la ubicación residencial"); return false; }
// //     if (!edadMin || !edadMax) { Alert.alert("Error", "Debes ingresar el rango de edad"); return false; }
// //     if (parseInt(edadMin) >= parseInt(edadMax)) { Alert.alert("Error", "La edad mínima debe ser menor que la máxima"); return false; }
// //     if (poseeTerreno === null) { Alert.alert("Error", "Debes indicar si posees un terreno"); return false; }
// //     if (poseeTerreno) {
// //       if (!terrenoUbicacion.trim()) { Alert.alert("Error", "Indica la ubicación del terreno"); return false; }
// //       if (!terrenoSuperficie.trim()) { Alert.alert("Error", "Indica la superficie del terreno"); return false; }
// //       if (!terrenoTipo) { Alert.alert("Error", "Selecciona el tipo de terreno"); return false; }
// //       if (!terrenoCapacidad.trim()) { Alert.alert("Error", "Indica la capacidad de familias/personas"); return false; }
// //       if (!terrenoNPisos.trim()) { Alert.alert("Error", "Indica el número de pisos previstos"); return false; }
// //     }
// //     return true;
// //   };

// //   const guardarDatos = async () => {
// //     if (!validarFormulario()) return;
// //     setLoading(true);
// //     try {
// //       const terrenoData = poseeTerreno
// //         ? {
// //             ubicacion:   terrenoUbicacion,
// //             superficie:  parseFloat(terrenoSuperficie),
// //             precio:      terrenoPrecio ? parseFloat(terrenoPrecio) : null,
// //             tipo:        terrenoTipo,
// //             catastral:   terrenoCatastral,
// //             descripcion: terrenoDescripcion,
// //             capacidad:   parseInt(terrenoCapacidad),
// //             nPisos:      parseInt(terrenoNPisos),
// //           }
// //         : null;

// //       const infoPersonal = {
// //         capital,
// //         sexo,
// //         sexoCompanero,
// //         zonaResidencial,
// //         ubicacion:           zonaResidencial ? ubicacion : "N/A",
// //         edadMin:             parseInt(edadMin),
// //         edadMax:             parseInt(edadMax),
// //         poseeTerreno,
// //         terreno:             terrenoData,
// //         fechaActualizacion:  new Date().toISOString(),
// //       };

// //       await AsyncStorage.setItem("infoPersonal", JSON.stringify(infoPersonal));

// //       if (poseeTerreno && terrenoData) {
// //         const grupoId = `terreno_${Date.now()}`;
// //         const nuevoGrupo = {
// //           id:          grupoId,
// //           nombre:      `Terreno · ${terrenoUbicacion}`,
// //           tipo:        "terreno",
// //           capacidad:   parseInt(terrenoCapacidad),
// //           nPisos:      parseInt(terrenoNPisos),
// //           terreno:     terrenoData,
// //           miembros:    [],
// //           mensajes:    [],
// //           creadoEn:    new Date().toISOString(),
// //         };

// //         const gruposRaw  = await AsyncStorage.getItem("grupos");
// //         const grupos     = gruposRaw ? JSON.parse(gruposRaw) : [];
// //         grupos.push(nuevoGrupo);
// //         await AsyncStorage.setItem("grupos", JSON.stringify(grupos));
// //         await AsyncStorage.setItem("miGrupoTerreno", grupoId);
// //       }

// //       navigation.replace("Decision");
// //     } catch (error) {
// //       Alert.alert("Error", "No se pudo guardar la información");
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const opcionesSexo        = ["HOMBRE", "MUJER"];
// //   const opcionesTipoTerreno = ["URBANO", "RÚSTICO"];

// //   // ── GRADIENTE GLOBAL ─────────────────────────────────────
// //   const GRAD = ["#CC0000", "#2B2D4E"];

// //   // Botón de opción con degradado
// //   const OpcionBtn = ({ valor, seleccionado, onPress }) => (
// //     <TouchableOpacity
// //       onPress={onPress}
// //       activeOpacity={0.85}
// //       style={styles.optionButton}
// //     >
// //       {seleccionado ? (
// //         <LinearGradient
// //           colors={GRAD}
// //           start={{ x: 0, y: 0 }}
// //           end={{ x: 1, y: 0 }}
// //           style={styles.optionGradient}
// //         >
// //           <Text style={styles.optionTextSelected}>{valor}</Text>
// //         </LinearGradient>
// //       ) : (
// //         <View style={[styles.optionGradient, styles.optionUnselected]}>
// //           <Text style={styles.optionText}>{valor}</Text>
// //         </View>
// //       )}
// //     </TouchableOpacity>
// //   );

// //   // Radio button con degradado
// //   const RadioBtn = ({ seleccionado, onPress, label }) => (
// //     <TouchableOpacity style={styles.radioOption} onPress={onPress} activeOpacity={0.85}>
// //       {seleccionado ? (
// //         <LinearGradient
// //           colors={GRAD}
// //           start={{ x: 0, y: 0 }}
// //           end={{ x: 1, y: 0 }}
// //           style={styles.radioCircleSelected}
// //         >
// //           <View style={styles.selectedRb} />
// //         </LinearGradient>
// //       ) : (
// //         <View style={styles.radioCircle} />
// //       )}
// //       <Text style={styles.radioText}>{label}</Text>
// //     </TouchableOpacity>
// //   );

// //   // Separador de sección
// //   const SectionDivider = ({ titulo }) => (
// //     <LinearGradient
// //       colors={GRAD}
// //       start={{ x: 0, y: 0 }}
// //       end={{ x: 1, y: 0 }}
// //       style={styles.sectionDivider}
// //     >
// //       <Text style={styles.sectionDividerText}>{titulo}</Text>
// //     </LinearGradient>
// //   );

// //   return (
// //     <ScrollView
// //       contentContainerStyle={styles.container}
// //       showsVerticalScrollIndicator={false}
// //     >
// //       {/* BOTÓN VOLVER */}
// //       <TouchableOpacity 
// //         style={styles.backButton} 
// //         onPress={() => navigation.navigate("Login")}
// //       >
// //         <Ionicons
// //           name="arrow-back"
// //           size={26}
// //           color={theme.colors.text}
// //         />
// //       </TouchableOpacity>

// //       {/* CAPITAL */}
// //       <SectionDivider titulo="CAPITAL APROXIMADO" />
// //       <Text style={styles.capitalText}>{capital.toLocaleString()} €</Text>
// //       <TextInput
// //         style={styles.input}
// //         keyboardType="numeric"
// //         value={capital.toString()}
// //         onChangeText={(val) => setCapital(Number(val))}
// //         placeholder="Ej: 5000"
// //         placeholderTextColor="#999"
// //       />

// //       {/* SEXO */}
// //       <SectionDivider titulo="SEXO *" />
// //       <View style={styles.optionsContainer}>
// //         {opcionesSexo.map((op) => (
// //           <OpcionBtn key={op} valor={op} seleccionado={sexo === op} onPress={() => setSexo(op)} />
// //         ))}
// //       </View>

// //       {/* SEXO COMPAÑERO */}
// //       <SectionDivider titulo="SEXO COMPAÑERO/A" />
// //       <View style={styles.optionsContainer}>
// //         {opcionesSexo.map((op) => (
// //           <OpcionBtn key={op} valor={op} seleccionado={sexoCompanero === op} onPress={() => setSexoCompanero(op)} />
// //         ))}
// //       </View>

// //       {/* ZONA RESIDENCIAL */}
// //       <SectionDivider titulo="ZONA RESIDENCIAL *" />
// //       <View style={styles.radioContainer}>
// //         <RadioBtn seleccionado={zonaResidencial === true}  onPress={() => setZonaResidencial(true)}  label="SÍ" />
// //         <RadioBtn seleccionado={zonaResidencial === false} onPress={() => setZonaResidencial(false)} label="NO" />
// //       </View>

// //       {zonaResidencial === true && (
// //         <>
// //           <Text style={styles.label}>UBICACIÓN *</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Escribe la ubicación"
// //             value={ubicacion}
// //             onChangeText={setUbicacion}
// //             placeholderTextColor="#999"
// //           />
// //         </>
// //       )}

// //       {/* POSEE TERRENO */}
// //       <SectionDivider titulo="POSEE TERRENO *" />
// //       <View style={styles.radioContainer}>
// //         <RadioBtn seleccionado={poseeTerreno === true}  onPress={() => setPoseeTerreno(true)}  label="SÍ" />
// //         <RadioBtn seleccionado={poseeTerreno === false} onPress={() => setPoseeTerreno(false)} label="NO" />
// //       </View>

// //       {/* FORMULARIO TERRENO */}
// //       {poseeTerreno === true && (
// //         <View style={styles.terrenoCard}>
// //           <LinearGradient
// //             colors={GRAD}
// //             start={{ x: 0, y: 0 }}
// //             end={{ x: 1, y: 0 }}
// //             style={styles.terrenoCardHeader}
// //           >
// //             <Text style={styles.terrenoCardHeaderText}>🏗️  DATOS DEL TERRENO</Text>
// //           </LinearGradient>

// //           <View style={styles.terrenoCardBody}>
// //             <Text style={styles.label}>UBICACIÓN / DIRECCIÓN *</Text>
// //             <TextInput style={styles.input} placeholder="Ej: Calle Mayor 12, Madrid" value={terrenoUbicacion} onChangeText={setTerrenoUbicacion} placeholderTextColor="#999" />

// //             <Text style={styles.label}>SUPERFICIE (m²) *</Text>
// //             <TextInput style={styles.input} placeholder="Ej: 500" keyboardType="numeric" value={terrenoSuperficie} onChangeText={setTerrenoSuperficie} placeholderTextColor="#999" />

// //             <Text style={styles.label}>PRECIO / VALOR ESTIMADO (€)</Text>
// //             <TextInput style={styles.input} placeholder="Ej: 120000" keyboardType="numeric" value={terrenoPrecio} onChangeText={setTerrenoPrecio} placeholderTextColor="#999" />

// //             <Text style={styles.label}>TIPO DE TERRENO *</Text>
// //             <View style={styles.optionsContainer}>
// //               {opcionesTipoTerreno.map((op) => (
// //                 <OpcionBtn key={op} valor={op} seleccionado={terrenoTipo === op} onPress={() => setTerrenoTipo(op)} />
// //               ))}
// //             </View>

// //             <Text style={styles.label}>REFERENCIA CATASTRAL</Text>
// //             <TextInput style={styles.input} placeholder="Ej: 1234567AB1234A0001FG" value={terrenoCatastral} onChangeText={setTerrenoCatastral} placeholderTextColor="#999" autoCapitalize="characters" />

// //             <View style={styles.row}>
// //               <View style={styles.ageInputContainer}>
// //                 <Text style={styles.subLabel}>Nº PISOS PREVISTOS *</Text>
// //                 <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 3" value={terrenoNPisos} onChangeText={setTerrenoNPisos} placeholderTextColor="#999" />
// //               </View>
// //               <View style={styles.ageInputContainer}>
// //                 <Text style={styles.subLabel}>FAMILIAS / PERSONAS *</Text>
// //                 <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 10" value={terrenoCapacidad} onChangeText={setTerrenoCapacidad} placeholderTextColor="#999" />
// //               </View>
// //             </View>

// //             <Text style={styles.label}>DESCRIPCIÓN ADICIONAL</Text>
// //             <TextInput
// //               style={[styles.input, styles.textArea]}
// //               placeholder="Añade cualquier detalle relevante sobre el terreno..."
// //               value={terrenoDescripcion}
// //               onChangeText={setTerrenoDescripcion}
// //               placeholderTextColor="#999"
// //               multiline
// //               numberOfLines={4}
// //               textAlignVertical="top"
// //             />

// //             <View style={styles.infoGrupoBox}>
// //               <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.infoGrupoGradient}>
// //                 <Text style={styles.infoGrupoText}>
// //                   💬  Al guardar se creará automáticamente un grupo de chat vinculado a este terreno en la sección de Chats del Home. Solo los integrantes del terreno tendrán acceso.
// //                 </Text>
// //               </LinearGradient>
// //             </View>
// //           </View>
// //         </View>
// //       )}

// //       {/* RANGO DE EDAD */}
// //       <SectionDivider titulo="RANGO DE EDAD *" />
// //       <View style={styles.row}>
// //         <View style={styles.ageInputContainer}>
// //           <Text style={styles.subLabel}>MÍNIMA</Text>
// //           <TextInput style={styles.input} keyboardType="numeric" value={edadMin} onChangeText={setEdadMin} placeholder="Ej: 25" placeholderTextColor="#999" />
// //         </View>
// //         <View style={styles.ageInputContainer}>
// //           <Text style={styles.subLabel}>MÁXIMA</Text>
// //           <TextInput style={styles.input} keyboardType="numeric" value={edadMax} onChangeText={setEdadMax} placeholder="Ej: 45" placeholderTextColor="#999" />
// //         </View>
// //       </View>

// //       {/* BOTÓN GUARDAR */}
// //       <TouchableOpacity
// //         // onPress={guardarDatos}
// //         onPress={() => navigation.navigate('Login')}
// //         disabled={loading}
// //         activeOpacity={0.85}
// //         style={{ borderRadius: 12, overflow: "hidden", marginTop: 40 }}
// //       >
// //         <LinearGradient
// //           colors={GRAD}
// //           start={{ x: 0, y: 0 }}
// //           end={{ x: 1, y: 0 }}
// //           style={[styles.saveButton, loading && styles.saveButtonDisabled]}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles.saveButtonText}>GUARDAR INFORMACIÓN</Text>
// //           )}
// //         </LinearGradient>
// //       </TouchableOpacity>

// //       <View style={styles.noteBox}>
// //         <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.noteGradient}>
// //           <Text style={styles.noteText}>NOTA: Los campos marcados con * son obligatorios.</Text>
// //         </LinearGradient>
// //       </View>

// //       <View style={{ height: 40 }} />
// //     </ScrollView>
// //   );
// // }

// // // ── ESTILOS ──────────────────────────────────────────────────
// // const createStyles = (colors) =>
// //   StyleSheet.create({
// //     container: {
// //       padding: 20,
// //       paddingBottom: 40,
// //       backgroundColor: "#F5F0E8",   // fondo crema de la imagen
// //       minHeight: "100%",
// //     },

// //     // Volver
// //     backButton: {
// //       alignSelf: "flex-start",
// //       borderRadius: 20,
// //       overflow: "hidden",
// //       marginBottom: 10,
// //       marginTop: 10,
// //     },
// //     backGradient: {
// //       paddingVertical: 8,
// //       paddingHorizontal: 18,
// //       borderRadius: 20,
// //     },
// //     backText: {
// //       fontSize: 14,
// //       fontWeight: "bold",
// //       color: "#fff",
// //     },

// //     title: {
// //       fontSize: 32,
// //       fontWeight: "bold",
// //       textAlign: "center",
// //       marginBottom: 24,
// //       marginTop: 10,
// //       color: "#2B2D4E",
// //     },

// //     // Separador de sección
// //     sectionDivider: {
// //       borderRadius: 10,
// //       paddingVertical: 10,
// //       paddingHorizontal: 16,
// //       marginTop: 24,
// //       marginBottom: 10,
// //     },
// //     sectionDividerText: {
// //       color: "#fff",
// //       fontWeight: "700",
// //       fontSize: 13,
// //       letterSpacing: 0.5,
// //     },

// //     label: {
// //       marginTop: 16,
// //       marginBottom: 6,
// //       fontWeight: "700",
// //       fontSize: 13,
// //       color: "#2B2D4E",
// //     },
// //     subLabel: {
// //       fontSize: 12,
// //       fontWeight: "600",
// //       color: "#2B2D4E",
// //       marginBottom: 5,
// //     },
// //     capitalText: {
// //       textAlign: "center",
// //       marginBottom: 8,
// //       fontSize: 24,
// //       fontWeight: "bold",
// //       color: "#CC0000",
// //     },
// //     input: {
// //       borderWidth: 1.5,
// //       borderColor: "#CC0000",
// //       borderRadius: 10,
// //       padding: 12,
// //       marginTop: 4,
// //       backgroundColor: "#fff",
// //       fontSize: 15,
// //       color: "#2B2D4E",
// //     },
// //     textArea: {
// //       minHeight: 90,
// //       paddingTop: 10,
// //     },

// //     // Opciones
// //     optionsContainer: {
// //       flexDirection: "row",
// //       justifyContent: "space-around",
// //       marginVertical: 8,
// //     },
// //     optionButton: {
// //       borderRadius: 10,
// //       overflow: "hidden",
// //       minWidth: 120,
// //     },
// //     optionGradient: {
// //       paddingVertical: 12,
// //       paddingHorizontal: 20,
// //       alignItems: "center",
// //     },
// //     optionUnselected: {
// //       backgroundColor: "#fff",
// //       borderWidth: 1.5,
// //       borderColor: "#CC0000",
// //       borderRadius: 10,
// //     },
// //     optionText: {
// //       fontWeight: "600",
// //       fontSize: 13,
// //       color: "#CC0000",
// //     },
// //     optionTextSelected: {
// //       fontWeight: "700",
// //       fontSize: 13,
// //       color: "#fff",
// //     },

// //     // Radio
// //     radioContainer: {
// //       flexDirection: "row",
// //       justifyContent: "space-around",
// //       marginVertical: 12,
// //     },
// //     radioOption: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingVertical: 10,
// //       paddingHorizontal: 20,
// //     },
// //     radioCircle: {
// //       height: 24,
// //       width: 24,
// //       borderRadius: 12,
// //       borderWidth: 1.5,
// //       borderColor: "#CC0000",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       marginRight: 10,
// //       backgroundColor: "#fff",
// //     },
// //     radioCircleSelected: {
// //       height: 24,
// //       width: 24,
// //       borderRadius: 12,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       marginRight: 10,
// //     },
// //     selectedRb: {
// //       width: 10,
// //       height: 10,
// //       borderRadius: 5,
// //       backgroundColor: "#fff",
// //     },
// //     radioText: {
// //       fontSize: 16,
// //       fontWeight: "600",
// //       color: "#2B2D4E",
// //     },

// //     // Fila doble
// //     row: {
// //       flexDirection: "row",
// //       justifyContent: "space-between",
// //       marginTop: 8,
// //     },
// //     ageInputContainer: {
// //       width: "47%",
// //     },

// //     // Tarjeta terreno
// //     terrenoCard: {
// //       borderWidth: 1.5,
// //       borderColor: "#CC0000",
// //       borderRadius: 14,
// //       overflow: "hidden",
// //       marginTop: 4,
// //       marginBottom: 8,
// //       backgroundColor: "#fff",
// //     },
// //     terrenoCardHeader: {
// //       paddingVertical: 12,
// //       paddingHorizontal: 16,
// //     },
// //     terrenoCardHeaderText: {
// //       color: "#fff",
// //       fontWeight: "800",
// //       fontSize: 15,
// //       letterSpacing: 0.5,
// //     },
// //     terrenoCardBody: {
// //       padding: 14,
// //     },

// //     // Info grupo
// //     infoGrupoBox: {
// //       borderRadius: 10,
// //       overflow: "hidden",
// //       marginTop: 20,
// //       marginHorizontal: 4,
// //       marginBottom: 8,
// //     },
// //     infoGrupoGradient: {
// //       padding: 14,
// //       borderRadius: 10,
// //     },
// //     infoGrupoText: {
// //       color: "#fff",
// //       fontSize: 12.5,
// //       fontWeight: "500",
// //       lineHeight: 19,
// //       textAlign: "center",
// //     },

// //     // Guardar
// //     saveButton: {
// //       padding: 18,
// //       borderRadius: 12,
// //       alignItems: "center",
// //     },
// //     saveButtonDisabled: {
// //       opacity: 0.6,
// //     },
// //     saveButtonText: {
// //       fontWeight: "bold",
// //       fontSize: 17,
// //       letterSpacing: 1,
// //       color: "#fff",
// //     },

// //     // Nota
// //     noteBox: {
// //       marginTop: 24,
// //       borderRadius: 10,
// //       overflow: "hidden",
// //     },
// //     noteGradient: {
// //       padding: 14,
// //       borderRadius: 10,
// //     },
// //     noteText: {
// //       textAlign: "center",
// //       fontWeight: "500",
// //       color: "#fff",
// //       fontSize: 13,
// //     },
// //   });

// import React, { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import api from "../api/axios"; // CONEXIÓN AL BACKEND
// import { useTheme } from "../theme/ThemeProvider";
// import { Ionicons } from "@expo/vector-icons";

// export default function InfoPersonalScreen({ navigation }) {
//   const { theme } = useTheme();
//   const { colors } = theme;
//   const styles = createStyles(colors);

//   const [capital,         setCapital]         = useState(5000);
//   const [sexo,            setSexo]            = useState("");
//   const [sexoCompanero,   setSexoCompanero]   = useState("");
//   const [zonaResidencial, setZonaResidencial] = useState(null);
//   const [ubicacion,       setUbicacion]       = useState("");
//   const [edadMin,         setEdadMin]         = useState("");
//   const [edadMax,         setEdadMax]         = useState("");
//   const [loading,         setLoading]         = useState(false);

//   const [poseeTerreno,        setPoseeTerreno]        = useState(null);
//   const [terrenoUbicacion,    setTerrenoUbicacion]    = useState("");
//   const [terrenoSuperficie,   setTerrenoSuperficie]   = useState("");
//   const [terrenoPrecio,       setTerrenoPrecio]       = useState("");
//   const [terrenoTipo,         setTerrenoTipo]         = useState("");
//   const [terrenoCatastral,    setTerrenoCatastral]    = useState("");
//   const [terrenoDescripcion,  setTerrenoDescripcion]  = useState("");
//   const [terrenoCapacidad,    setTerrenoCapacidad]    = useState("");
//   const [terrenoNPisos,       setTerrenoNPisos]       = useState("");

//   const validarFormulario = () => {
//     if (!sexo) { Alert.alert("Error", "Debes seleccionar tu sexo"); return false; }
//     if (zonaResidencial === null) { Alert.alert("Error", "Debes seleccionar zona residencial"); return false; }
//     if (zonaResidencial && !ubicacion.trim()) { Alert.alert("Error", "Debes ingresar la ubicación residencial"); return false; }
//     if (!edadMin || !edadMax) { Alert.alert("Error", "Debes ingresar el rango de edad"); return false; }
//     if (parseInt(edadMin) >= parseInt(edadMax)) { Alert.alert("Error", "La edad mínima debe ser menor que la máxima"); return false; }
//     if (poseeTerreno === null) { Alert.alert("Error", "Debes indicar si posees un terreno"); return false; }
//     if (poseeTerreno) {
//       if (!terrenoUbicacion.trim()) { Alert.alert("Error", "Indica la ubicación del terreno"); return false; }
//       if (!terrenoSuperficie.trim()) { Alert.alert("Error", "Indica la superficie del terreno"); return false; }
//       if (!terrenoTipo) { Alert.alert("Error", "Selecciona el tipo de terreno"); return false; }
//       if (!terrenoCapacidad.trim()) { Alert.alert("Error", "Indica la capacidad de familias/personas"); return false; }
//       if (!terrenoNPisos.trim()) { Alert.alert("Error", "Indica el número de pisos previstos"); return false; }
//     }
//     return true;
//   };

//   const guardarDatos = async () => {
//     if (!validarFormulario()) return;
//     setLoading(true);
    
//     try {
//       // 1. Enviar datos personales al backend
//       const payloadPersonal = {
//         capital,
//         sexo,
//         sexo_companero: sexoCompanero,
//         zona_residencial: zonaResidencial,
//         ubicacion: zonaResidencial ? ubicacion : "N/A",
//         edad_min: parseInt(edadMin),
//         edad_max: parseInt(edadMax),
//       };
      
//       await api.post('/onboarding/personal', payloadPersonal);

//       // 2. Si posee terreno, crear el grupo cooperativo
//       if (poseeTerreno) {
//         const payloadGrupo = {
//           nombre: `Terreno · ${terrenoUbicacion}`,
//           ubicacion: terrenoUbicacion,
//           superficie: parseFloat(terrenoSuperficie),
//           precio: terrenoPrecio ? parseFloat(terrenoPrecio) : null,
//           tipo: terrenoTipo,
//           catastral: terrenoCatastral,
//           descripcion: terrenoDescripcion,
//           capacidad: parseInt(terrenoCapacidad),
//           n_pisos: parseInt(terrenoNPisos),
//         };
//         await api.post('/grupos', payloadGrupo);
//       }

//       // 3. Finalizar onboarding
//       await api.post('/onboarding/complete');

//       navigation.replace("Decision");
//     } catch (error) {
//       Alert.alert("Error", "No se pudo guardar la información en el servidor");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const opcionesSexo        = ["HOMBRE", "MUJER"];
//   const opcionesTipoTerreno = ["URBANO", "RÚSTICO"];

//   // ── GRADIENTE GLOBAL ─────────────────────────────────────
//   const GRAD = ["#CC0000", "#2B2D4E"];

//   // Botón de opción con degradado
//   const OpcionBtn = ({ valor, seleccionado, onPress }) => (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.85}
//       style={styles.optionButton}
//     >
//       {seleccionado ? (
//         <LinearGradient
//           colors={GRAD}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.optionGradient}
//         >
//           <Text style={styles.optionTextSelected}>{valor}</Text>
//         </LinearGradient>
//       ) : (
//         <View style={[styles.optionGradient, styles.optionUnselected]}>
//           <Text style={styles.optionText}>{valor}</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   );

//   // Radio button con degradado
//   const RadioBtn = ({ seleccionado, onPress, label }) => (
//     <TouchableOpacity style={styles.radioOption} onPress={onPress} activeOpacity={0.85}>
//       {seleccionado ? (
//         <LinearGradient
//           colors={GRAD}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.radioCircleSelected}
//         >
//           <View style={styles.selectedRb} />
//         </LinearGradient>
//       ) : (
//         <View style={styles.radioCircle} />
//       )}
//       <Text style={styles.radioText}>{label}</Text>
//     </TouchableOpacity>
//   );

//   // Separador de sección
//   const SectionDivider = ({ titulo }) => (
//     <LinearGradient
//       colors={GRAD}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={styles.sectionDivider}
//     >
//       <Text style={styles.sectionDividerText}>{titulo}</Text>
//     </LinearGradient>
//   );

//   return (
//     <ScrollView
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* BOTÓN VOLVER */}
//       <TouchableOpacity 
//         style={styles.backButton} 
//         onPress={() => navigation.navigate("Login")}
//       >
//         <Ionicons
//           name="arrow-back"
//           size={26}
//           color={theme.colors.text}
//         />
//       </TouchableOpacity>

//       {/* CAPITAL */}
//       <SectionDivider titulo="CAPITAL APROXIMADO" />
//       <Text style={styles.capitalText}>{capital.toLocaleString()} €</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         value={capital.toString()}
//         onChangeText={(val) => setCapital(Number(val) || 0)}
//         placeholder="Ej: 5000"
//         placeholderTextColor="#999"
//       />

//       {/* SEXO */}
//       <SectionDivider titulo="SEXO *" />
//       <View style={styles.optionsContainer}>
//         {opcionesSexo.map((op) => (
//           <OpcionBtn key={op} valor={op} seleccionado={sexo === op} onPress={() => setSexo(op)} />
//         ))}
//       </View>

//       {/* SEXO COMPAÑERO */}
//       <SectionDivider titulo="SEXO COMPAÑERO/A" />
//       <View style={styles.optionsContainer}>
//         {opcionesSexo.map((op) => (
//           <OpcionBtn key={op} valor={op} seleccionado={sexoCompanero === op} onPress={() => setSexoCompanero(op)} />
//         ))}
//       </View>

//       {/* ZONA RESIDENCIAL */}
//       <SectionDivider titulo="ZONA RESIDENCIAL *" />
//       <View style={styles.radioContainer}>
//         <RadioBtn seleccionado={zonaResidencial === true}  onPress={() => setZonaResidencial(true)}  label="SÍ" />
//         <RadioBtn seleccionado={zonaResidencial === false} onPress={() => setZonaResidencial(false)} label="NO" />
//       </View>

//       {zonaResidencial === true && (
//         <>
//           <Text style={styles.label}>UBICACIÓN *</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Escribe la ubicación"
//             value={ubicacion}
//             onChangeText={setUbicacion}
//             placeholderTextColor="#999"
//           />
//         </>
//       )}

//       {/* POSEE TERRENO */}
//       <SectionDivider titulo="POSEE TERRENO *" />
//       <View style={styles.radioContainer}>
//         <RadioBtn seleccionado={poseeTerreno === true}  onPress={() => setPoseeTerreno(true)}  label="SÍ" />
//         <RadioBtn seleccionado={poseeTerreno === false} onPress={() => setPoseeTerreno(false)} label="NO" />
//       </View>

//       {/* FORMULARIO TERRENO */}
//       {poseeTerreno === true && (
//         <View style={styles.terrenoCard}>
//           <LinearGradient
//             colors={GRAD}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.terrenoCardHeader}
//           >
//             <Text style={styles.terrenoCardHeaderText}>🏗️  DATOS DEL TERRENO</Text>
//           </LinearGradient>

//           <View style={styles.terrenoCardBody}>
//             <Text style={styles.label}>UBICACIÓN / DIRECCIÓN *</Text>
//             <TextInput style={styles.input} placeholder="Ej: Calle Mayor 12, Madrid" value={terrenoUbicacion} onChangeText={setTerrenoUbicacion} placeholderTextColor="#999" />

//             <Text style={styles.label}>SUPERFICIE (m²) *</Text>
//             <TextInput style={styles.input} placeholder="Ej: 500" keyboardType="numeric" value={terrenoSuperficie} onChangeText={setTerrenoSuperficie} placeholderTextColor="#999" />

//             <Text style={styles.label}>PRECIO / VALOR ESTIMADO (€)</Text>
//             <TextInput style={styles.input} placeholder="Ej: 120000" keyboardType="numeric" value={terrenoPrecio} onChangeText={setTerrenoPrecio} placeholderTextColor="#999" />

//             <Text style={styles.label}>TIPO DE TERRENO *</Text>
//             <View style={styles.optionsContainer}>
//               {opcionesTipoTerreno.map((op) => (
//                 <OpcionBtn key={op} valor={op} seleccionado={terrenoTipo === op} onPress={() => setTerrenoTipo(op)} />
//               ))}
//             </View>

//             <Text style={styles.label}>REFERENCIA CATASTRAL</Text>
//             <TextInput style={styles.input} placeholder="Ej: 1234567AB1234A0001FG" value={terrenoCatastral} onChangeText={setTerrenoCatastral} placeholderTextColor="#999" autoCapitalize="characters" />

//             <View style={styles.row}>
//               <View style={styles.ageInputContainer}>
//                 <Text style={styles.subLabel}>Nº PISOS PREVISTOS *</Text>
//                 <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 3" value={terrenoNPisos} onChangeText={setTerrenoNPisos} placeholderTextColor="#999" />
//               </View>
//               <View style={styles.ageInputContainer}>
//                 <Text style={styles.subLabel}>FAMILIAS / PERSONAS *</Text>
//                 <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 10" value={terrenoCapacidad} onChangeText={setTerrenoCapacidad} placeholderTextColor="#999" />
//               </View>
//             </View>

//             <Text style={styles.label}>DESCRIPCIÓN ADICIONAL</Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               placeholder="Añade cualquier detalle relevante sobre el terreno..."
//               value={terrenoDescripcion}
//               onChangeText={setTerrenoDescripcion}
//               placeholderTextColor="#999"
//               multiline
//               numberOfLines={4}
//               textAlignVertical="top"
//             />

//             <View style={styles.infoGrupoBox}>
//               <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.infoGrupoGradient}>
//                 <Text style={styles.infoGrupoText}>
//                   💬  Al guardar se creará automáticamente un grupo de chat vinculado a este terreno en la sección de Chats del Home. Solo los integrantes del terreno tendrán acceso.
//                 </Text>
//               </LinearGradient>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* RANGO DE EDAD */}
//       <SectionDivider titulo="RANGO DE EDAD *" />
//       <View style={styles.row}>
//         <View style={styles.ageInputContainer}>
//           <Text style={styles.subLabel}>MÍNIMA</Text>
//           <TextInput style={styles.input} keyboardType="numeric" value={edadMin} onChangeText={setEdadMin} placeholder="Ej: 25" placeholderTextColor="#999" />
//         </View>
//         <View style={styles.ageInputContainer}>
//           <Text style={styles.subLabel}>MÁXIMA</Text>
//           <TextInput style={styles.input} keyboardType="numeric" value={edadMax} onChangeText={setEdadMax} placeholder="Ej: 45" placeholderTextColor="#999" />
//         </View>
//       </View>

//       {/* BOTÓN GUARDAR */}
//       <TouchableOpacity
//         onPress={guardarDatos}
//         disabled={loading}
//         activeOpacity={0.85}
//         style={{ borderRadius: 12, overflow: "hidden", marginTop: 40 }}
//       >
//         <LinearGradient
//           colors={GRAD}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={[styles.saveButton, loading && styles.saveButtonDisabled]}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>GUARDAR INFORMACIÓN</Text>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>

//       <View style={styles.noteBox}>
//         <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.noteGradient}>
//           <Text style={styles.noteText}>NOTA: Los campos marcados con * son obligatorios.</Text>
//         </LinearGradient>
//       </View>

//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// }

// // ── ESTILOS ──────────────────────────────────────────────────
// const createStyles = (colors) =>
//   StyleSheet.create({
//     container: {
//       padding: 20,
//       paddingBottom: 40,
//       backgroundColor: "#F5F0E8",
//       minHeight: "100%",
//     },

//     // Volver
//     backButton: {
//       alignSelf: "flex-start",
//       borderRadius: 20,
//       overflow: "hidden",
//       marginBottom: 10,
//       marginTop: 10,
//     },
//     backGradient: {
//       paddingVertical: 8,
//       paddingHorizontal: 18,
//       borderRadius: 20,
//     },
//     backText: {
//       fontSize: 14,
//       fontWeight: "bold",
//       color: "#fff",
//     },

//     title: {
//       fontSize: 32,
//       fontWeight: "bold",
//       textAlign: "center",
//       marginBottom: 24,
//       marginTop: 10,
//       color: "#2B2D4E",
//     },

//     // Separador de sección
//     sectionDivider: {
//       borderRadius: 10,
//       paddingVertical: 10,
//       paddingHorizontal: 16,
//       marginTop: 24,
//       marginBottom: 10,
//     },
//     sectionDividerText: {
//       color: "#fff",
//       fontWeight: "700",
//       fontSize: 13,
//       letterSpacing: 0.5,
//     },

//     label: {
//       marginTop: 16,
//       marginBottom: 6,
//       fontWeight: "700",
//       fontSize: 13,
//       color: "#2B2D4E",
//     },
//     subLabel: {
//       fontSize: 12,
//       fontWeight: "600",
//       color: "#2B2D4E",
//       marginBottom: 5,
//     },
//     capitalText: {
//       textAlign: "center",
//       marginBottom: 8,
//       fontSize: 24,
//       fontWeight: "bold",
//       color: "#CC0000",
//     },
//     input: {
//       borderWidth: 1.5,
//       borderColor: "#CC0000",
//       borderRadius: 10,
//       padding: 12,
//       marginTop: 4,
//       backgroundColor: "#fff",
//       fontSize: 15,
//       color: "#2B2D4E",
//     },
//     textArea: {
//       minHeight: 90,
//       paddingTop: 10,
//     },

//     // Opciones
//     optionsContainer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       marginVertical: 8,
//     },
//     optionButton: {
//       borderRadius: 10,
//       overflow: "hidden",
//       minWidth: 120,
//     },
//     optionGradient: {
//       paddingVertical: 12,
//       paddingHorizontal: 20,
//       alignItems: "center",
//     },
//     optionUnselected: {
//       backgroundColor: "#fff",
//       borderWidth: 1.5,
//       borderColor: "#CC0000",
//       borderRadius: 10,
//     },
//     optionText: {
//       fontWeight: "600",
//       fontSize: 13,
//       color: "#CC0000",
//     },
//     optionTextSelected: {
//       fontWeight: "700",
//       fontSize: 13,
//       color: "#fff",
//     },

//     // Radio
//     radioContainer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       marginVertical: 12,
//     },
//     radioOption: {
//       flexDirection: "row",
//       alignItems: "center",
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//     },
//     radioCircle: {
//       height: 24,
//       width: 24,
//       borderRadius: 12,
//       borderWidth: 1.5,
//       borderColor: "#CC0000",
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 10,
//       backgroundColor: "#fff",
//     },
//     radioCircleSelected: {
//       height: 24,
//       width: 24,
//       borderRadius: 12,
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 10,
//     },
//     selectedRb: {
//       width: 10,
//       height: 10,
//       borderRadius: 5,
//       backgroundColor: "#fff",
//     },
//     radioText: {
//       fontSize: 16,
//       fontWeight: "600",
//       color: "#2B2D4E",
//     },

//     // Fila doble
//     row: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginTop: 8,
//     },
//     ageInputContainer: {
//       width: "47%",
//     },

//     // Tarjeta terreno
//     terrenoCard: {
//       borderWidth: 1.5,
//       borderColor: "#CC0000",
//       borderRadius: 14,
//       overflow: "hidden",
//       marginTop: 4,
//       marginBottom: 8,
//       backgroundColor: "#fff",
//     },
//     terrenoCardHeader: {
//       paddingVertical: 12,
//       paddingHorizontal: 16,
//     },
//     terrenoCardHeaderText: {
//       color: "#fff",
//       fontWeight: "800",
//       fontSize: 15,
//       letterSpacing: 0.5,
//     },
//     terrenoCardBody: {
//       padding: 14,
//     },

//     // Info grupo
//     infoGrupoBox: {
//       borderRadius: 10,
//       overflow: "hidden",
//       marginTop: 20,
//       marginHorizontal: 4,
//       marginBottom: 8,
//     },
//     infoGrupoGradient: {
//       padding: 14,
//       borderRadius: 10,
//     },
//     infoGrupoText: {
//       color: "#fff",
//       fontSize: 12.5,
//       fontWeight: "500",
//       lineHeight: 19,
//       textAlign: "center",
//     },

//     // Guardar
//     saveButton: {
//       padding: 18,
//       borderRadius: 12,
//       alignItems: "center",
//     },
//     saveButtonDisabled: {
//       opacity: 0.6,
//     },
//     saveButtonText: {
//       fontWeight: "bold",
//       fontSize: 17,
//       letterSpacing: 1,
//       color: "#fff",
//     },

//     // Nota
//     noteBox: {
//       marginTop: 24,
//       borderRadius: 10,
//       overflow: "hidden",
//     },
//     noteGradient: {
//       padding: 14,
//       borderRadius: 10,
//     },
//     noteText: {
//       textAlign: "center",
//       fontWeight: "500",
//       color: "#fff",
//       fontSize: 13,
//     },
//   });

import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import api from "../api/axios"; // CONEXIÓN AL BACKEND
import { useTheme } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function InfoPersonalScreen({ navigation }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = createStyles(colors);

  const [capital,         setCapital]         = useState(5000);
  const [sexo,            setSexo]            = useState("");
  const [sexoCompanero,   setSexoCompanero]   = useState("");
  const [zonaResidencial, setZonaResidencial] = useState(null);
  const [ubicacion,       setUbicacion]       = useState("");
  const [edadMin,         setEdadMin]         = useState("");
  const [edadMax,         setEdadMax]         = useState("");
  const [loading,         setLoading]         = useState(false);

  const [poseeTerreno,        setPoseeTerreno]        = useState(null);
  const [terrenoUbicacion,    setTerrenoUbicacion]    = useState("");
  const [terrenoSuperficie,   setTerrenoSuperficie]   = useState("");
  const [terrenoPrecio,       setTerrenoPrecio]       = useState("");
  const [terrenoTipo,         setTerrenoTipo]         = useState("");
  const [terrenoCatastral,    setTerrenoCatastral]    = useState("");
  const [terrenoDescripcion,  setTerrenoDescripcion]  = useState("");
  const [terrenoCapacidad,    setTerrenoCapacidad]    = useState("");
  const [terrenoNPisos,       setTerrenoNPisos]       = useState("");

  const validarFormulario = () => {
    if (!sexo) { Alert.alert("Error", "Debes seleccionar tu sexo"); return false; }
    if (zonaResidencial === null) { Alert.alert("Error", "Debes seleccionar zona residencial"); return false; }
    if (zonaResidencial && !ubicacion.trim()) { Alert.alert("Error", "Debes ingresar la ubicación residencial"); return false; }
    if (!edadMin || !edadMax) { Alert.alert("Error", "Debes ingresar el rango de edad"); return false; }
    if (parseInt(edadMin) >= parseInt(edadMax)) { Alert.alert("Error", "La edad mínima debe ser menor que la máxima"); return false; }
    if (poseeTerreno === null) { Alert.alert("Error", "Debes indicar si posees un terreno"); return false; }
    if (poseeTerreno) {
      if (!terrenoUbicacion.trim()) { Alert.alert("Error", "Indica la ubicación del terreno"); return false; }
      if (!terrenoSuperficie.trim()) { Alert.alert("Error", "Indica la superficie del terreno"); return false; }
      if (!terrenoTipo) { Alert.alert("Error", "Selecciona el tipo de terreno"); return false; }
      if (!terrenoCapacidad.trim()) { Alert.alert("Error", "Indica la capacidad de familias/personas"); return false; }
      if (!terrenoNPisos.trim()) { Alert.alert("Error", "Indica el número de pisos previstos"); return false; }
    }
    return true;
  };

  const guardarDatos = async () => {
    if (!validarFormulario()) return;
    setLoading(true);
    
    try {
      const payloadPersonal = {
        capital: parseInt(capital),
        sexo: sexo,
        ubicacion: zonaResidencial ? ubicacion : "N/A",
        edad_min: parseInt(edadMin),
        edad_max: parseInt(edadMax),
      };
      
      // 1. Datos personales
      try {
        console.log("1. Llamando a -> /onboarding/basic");
        await api.post('/onboarding/basic', payloadPersonal);
      } catch (err) {
        console.log("Aviso: La ruta basic falló, continuando...");
      }

      // 2. Si posee terreno, crear el grupo cooperativo
      if (poseeTerreno) {
        const descripcionEmpaquetada = `Ubicación: ${terrenoUbicacion} | Tipo: ${terrenoTipo} | Superficie: ${terrenoSuperficie} m² | Capacidad: ${terrenoCapacidad} familias | Nº Pisos: ${terrenoNPisos}`;

        // ¡AQUÍ ESTÁ LA MAGIA! Nos adaptamos exactamente a lo que pide Laravel
        const payloadGrupo = {
          nombre: `Terreno · ${terrenoUbicacion}`,
          descripcion: descripcionEmpaquetada,
          ubicacion: terrenoUbicacion,                     // EXIGIDO POR LARAVEL
          capacidad_maxima: parseInt(terrenoCapacidad) || 1, // EXIGIDO POR LARAVEL (con parseInt para asegurar que sea un número)
        };

        console.log("2. Llamando a -> /grupos con:", payloadGrupo);
        await api.post('/grupos', payloadGrupo);
      }

      // 3. Finalizar onboarding
      try {
        console.log("3. Llamando a -> /onboarding/complete");
        await api.post('/onboarding/complete');
      } catch (err) {
        console.log("Aviso: La ruta complete falló, continuando...");
      }

      // Redirigir
      navigation.replace("Decision");

    } catch (error) {
      console.log("\n================ ERROR 422 (VALIDACIÓN) ================");
      console.log("Lo que Laravel exige es:");
      console.log(JSON.stringify(error.response?.data, null, 2));
      console.log("========================================================\n");
      
      Alert.alert("Aviso", "No se pudo guardar el grupo. Revisa el log.");
    } finally {
      setLoading(false);
    }
  };

  const opcionesSexo        = ["HOMBRE", "MUJER"];
  const opcionesTipoTerreno = ["URBANO", "RÚSTICO"];

  // ── GRADIENTE GLOBAL ─────────────────────────────────────
  const GRAD = ["#CC0000", "#2B2D4E"];

  // Botón de opción con degradado
  const OpcionBtn = ({ valor, seleccionado, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.optionButton}
    >
      {seleccionado ? (
        <LinearGradient
          colors={GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.optionGradient}
        >
          <Text style={styles.optionTextSelected}>{valor}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.optionGradient, styles.optionUnselected]}>
          <Text style={styles.optionText}>{valor}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Radio button con degradado
  const RadioBtn = ({ seleccionado, onPress, label }) => (
    <TouchableOpacity style={styles.radioOption} onPress={onPress} activeOpacity={0.85}>
      {seleccionado ? (
        <LinearGradient
          colors={GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.radioCircleSelected}
        >
          <View style={styles.selectedRb} />
        </LinearGradient>
      ) : (
        <View style={styles.radioCircle} />
      )}
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  // Separador de sección
  const SectionDivider = ({ titulo }) => (
    <LinearGradient
      colors={GRAD}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.sectionDivider}
    >
      <Text style={styles.sectionDividerText}>{titulo}</Text>
    </LinearGradient>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* BOTÓN VOLVER */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons
          name="arrow-back"
          size={26}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {/* CAPITAL */}
      <SectionDivider titulo="CAPITAL APROXIMADO" />
      <Text style={styles.capitalText}>{capital.toLocaleString()} €</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={capital.toString()}
        onChangeText={(val) => setCapital(Number(val) || 0)}
        placeholder="Ej: 5000"
        placeholderTextColor="#999"
      />

      {/* SEXO */}
      <SectionDivider titulo="SEXO *" />
      <View style={styles.optionsContainer}>
        {opcionesSexo.map((op) => (
          <OpcionBtn key={op} valor={op} seleccionado={sexo === op} onPress={() => setSexo(op)} />
        ))}
      </View>

      {/* SEXO COMPAÑERO */}
      <SectionDivider titulo="SEXO COMPAÑERO/A" />
      <View style={styles.optionsContainer}>
        {opcionesSexo.map((op) => (
          <OpcionBtn key={op} valor={op} seleccionado={sexoCompanero === op} onPress={() => setSexoCompanero(op)} />
        ))}
      </View>

      {/* ZONA RESIDENCIAL */}
      <SectionDivider titulo="ZONA RESIDENCIAL *" />
      <View style={styles.radioContainer}>
        <RadioBtn seleccionado={zonaResidencial === true}  onPress={() => setZonaResidencial(true)}  label="SÍ" />
        <RadioBtn seleccionado={zonaResidencial === false} onPress={() => setZonaResidencial(false)} label="NO" />
      </View>

      {zonaResidencial === true && (
        <>
          <Text style={styles.label}>UBICACIÓN *</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe la ubicación"
            value={ubicacion}
            onChangeText={setUbicacion}
            placeholderTextColor="#999"
          />
        </>
      )}

      {/* POSEE TERRENO */}
      <SectionDivider titulo="POSEE TERRENO *" />
      <View style={styles.radioContainer}>
        <RadioBtn seleccionado={poseeTerreno === true}  onPress={() => setPoseeTerreno(true)}  label="SÍ" />
        <RadioBtn seleccionado={poseeTerreno === false} onPress={() => setPoseeTerreno(false)} label="NO" />
      </View>

      {/* FORMULARIO TERRENO */}
      {poseeTerreno === true && (
        <View style={styles.terrenoCard}>
          <LinearGradient
            colors={GRAD}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.terrenoCardHeader}
          >
            <Text style={styles.terrenoCardHeaderText}>🏗️  DATOS DEL TERRENO</Text>
          </LinearGradient>

          <View style={styles.terrenoCardBody}>
            <Text style={styles.label}>UBICACIÓN / DIRECCIÓN *</Text>
            <TextInput style={styles.input} placeholder="Ej: Calle Mayor 12, Madrid" value={terrenoUbicacion} onChangeText={setTerrenoUbicacion} placeholderTextColor="#999" />

            <Text style={styles.label}>SUPERFICIE (m²) *</Text>
            <TextInput style={styles.input} placeholder="Ej: 500" keyboardType="numeric" value={terrenoSuperficie} onChangeText={setTerrenoSuperficie} placeholderTextColor="#999" />

            <Text style={styles.label}>PRECIO / VALOR ESTIMADO (€)</Text>
            <TextInput style={styles.input} placeholder="Ej: 120000" keyboardType="numeric" value={terrenoPrecio} onChangeText={setTerrenoPrecio} placeholderTextColor="#999" />

            <Text style={styles.label}>TIPO DE TERRENO *</Text>
            <View style={styles.optionsContainer}>
              {opcionesTipoTerreno.map((op) => (
                <OpcionBtn key={op} valor={op} seleccionado={terrenoTipo === op} onPress={() => setTerrenoTipo(op)} />
              ))}
            </View>

            <Text style={styles.label}>REFERENCIA CATASTRAL</Text>
            <TextInput style={styles.input} placeholder="Ej: 1234567AB1234A0001FG" value={terrenoCatastral} onChangeText={setTerrenoCatastral} placeholderTextColor="#999" autoCapitalize="characters" />

            <View style={styles.row}>
              <View style={styles.ageInputContainer}>
                <Text style={styles.subLabel}>Nº PISOS PREVISTOS *</Text>
                <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 3" value={terrenoNPisos} onChangeText={setTerrenoNPisos} placeholderTextColor="#999" />
              </View>
              <View style={styles.ageInputContainer}>
                <Text style={styles.subLabel}>FAMILIAS / PERSONAS *</Text>
                <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 10" value={terrenoCapacidad} onChangeText={setTerrenoCapacidad} placeholderTextColor="#999" />
              </View>
            </View>

            <Text style={styles.label}>DESCRIPCIÓN ADICIONAL</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Añade cualquier detalle relevante sobre el terreno..."
              value={terrenoDescripcion}
              onChangeText={setTerrenoDescripcion}
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.infoGrupoBox}>
              <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.infoGrupoGradient}>
                <Text style={styles.infoGrupoText}>
                  💬  Al guardar se creará automáticamente un grupo de chat vinculado a este terreno en la sección de Chats del Home. Solo los integrantes del terreno tendrán acceso.
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}

      {/* RANGO DE EDAD */}
      <SectionDivider titulo="RANGO DE EDAD *" />
      <View style={styles.row}>
        <View style={styles.ageInputContainer}>
          <Text style={styles.subLabel}>MÍNIMA</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={edadMin} onChangeText={setEdadMin} placeholder="Ej: 25" placeholderTextColor="#999" />
        </View>
        <View style={styles.ageInputContainer}>
          <Text style={styles.subLabel}>MÁXIMA</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={edadMax} onChangeText={setEdadMax} placeholder="Ej: 45" placeholderTextColor="#999" />
        </View>
      </View>

      {/* BOTÓN GUARDAR */}
      <TouchableOpacity
        onPress={guardarDatos}
        disabled={loading}
        activeOpacity={0.85}
        style={{ borderRadius: 12, overflow: "hidden", marginTop: 40 }}
      >
        <LinearGradient
          colors={GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>GUARDAR INFORMACIÓN</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.noteBox}>
        <LinearGradient colors={GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.noteGradient}>
          <Text style={styles.noteText}>NOTA: Los campos marcados con * son obligatorios.</Text>
        </LinearGradient>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ── ESTILOS ──────────────────────────────────────────────────
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 40,
      backgroundColor: "#F5F0E8",
      minHeight: "100%",
    },

    // Volver
    backButton: {
      alignSelf: "flex-start",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 10,
      marginTop: 10,
    },
    backGradient: {
      paddingVertical: 8,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    backText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#fff",
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      marginTop: 10,
      color: "#2B2D4E",
    },

    // Separador de sección
    sectionDivider: {
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 10,
    },
    sectionDividerText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 13,
      letterSpacing: 0.5,
    },

    label: {
      marginTop: 16,
      marginBottom: 6,
      fontWeight: "700",
      fontSize: 13,
      color: "#2B2D4E",
    },
    subLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: "#2B2D4E",
      marginBottom: 5,
    },
    capitalText: {
      textAlign: "center",
      marginBottom: 8,
      fontSize: 24,
      fontWeight: "bold",
      color: "#CC0000",
    },
    input: {
      borderWidth: 1.5,
      borderColor: "#CC0000",
      borderRadius: 10,
      padding: 12,
      marginTop: 4,
      backgroundColor: "#fff",
      fontSize: 15,
      color: "#2B2D4E",
    },
    textArea: {
      minHeight: 90,
      paddingTop: 10,
    },

    // Opciones
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 8,
    },
    optionButton: {
      borderRadius: 10,
      overflow: "hidden",
      minWidth: 120,
    },
    optionGradient: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    optionUnselected: {
      backgroundColor: "#fff",
      borderWidth: 1.5,
      borderColor: "#CC0000",
      borderRadius: 10,
    },
    optionText: {
      fontWeight: "600",
      fontSize: 13,
      color: "#CC0000",
    },
    optionTextSelected: {
      fontWeight: "700",
      fontSize: 13,
      color: "#fff",
    },

    // Radio
    radioContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 12,
    },
    radioOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#CC0000",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: "#fff",
    },
    radioCircleSelected: {
      height: 24,
      width: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    selectedRb: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
    },
    radioText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#2B2D4E",
    },

    // Fila doble
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    ageInputContainer: {
      width: "47%",
    },

    // Tarjeta terreno
    terrenoCard: {
      borderWidth: 1.5,
      borderColor: "#CC0000",
      borderRadius: 14,
      overflow: "hidden",
      marginTop: 4,
      marginBottom: 8,
      backgroundColor: "#fff",
    },
    terrenoCardHeader: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    terrenoCardHeaderText: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
      letterSpacing: 0.5,
    },
    terrenoCardBody: {
      padding: 14,
    },

    // Info grupo
    infoGrupoBox: {
      borderRadius: 10,
      overflow: "hidden",
      marginTop: 20,
      marginHorizontal: 4,
      marginBottom: 8,
    },
    infoGrupoGradient: {
      padding: 14,
      borderRadius: 10,
    },
    infoGrupoText: {
      color: "#fff",
      fontSize: 12.5,
      fontWeight: "500",
      lineHeight: 19,
      textAlign: "center",
    },

    // Guardar
    saveButton: {
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      fontWeight: "bold",
      fontSize: 17,
      letterSpacing: 1,
      color: "#fff",
    },

    // Nota
    noteBox: {
      marginTop: 24,
      borderRadius: 10,
      overflow: "hidden",
    },
    noteGradient: {
      padding: 14,
      borderRadius: 10,
    },
    noteText: {
      textAlign: "center",
      fontWeight: "500",
      color: "#fff",
      fontSize: 13,
    },
  });