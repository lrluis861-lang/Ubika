// import React, { createContext, useContext, useState } from "react";

// const ForoContext = createContext();

// export const MOCK_TERRENOS_FORO = [
//   {
//     id: "f1",
//     name: "Solar Retiro",
//     owner: "Inmobiliaria Cenit",
//     ownerAvatar: "https://i.pravatar.cc/80?img=12",
//     type: "Solar urbano",
//     location: "Madrid, España",
//     coordinates: { latitude: 40.4168, longitude: -3.7038 },
//     size: "420m2",
//     price: "180.000€",
//     image: "https://picsum.photos/seed/f1/600/300",
//     requirements: ["Ingresos > 2.000€/mes", "Sin deudas activas", "Edad > 25 años"],
//     accepted: 3,
//     vacants: 2,
//     description: "Solar en zona prime de Madrid, ideal para desarrollo residencial o comercial. Totalmente urbanizado con todos los servicios.",
//   },
//   {
//     id: "f2",
//     name: "Finca La Rioja",
//     owner: "Carlos Mendez",
//     ownerAvatar: "https://i.pravatar.cc/80?img=33",
//     type: "Finca rustica",
//     location: "Logroño, La Rioja",
//     coordinates: { latitude: 42.4627, longitude: -2.4449 },
//     size: "3.5Ha",
//     price: "95.000€",
//     image: "https://picsum.photos/seed/f2/600/300",
//     requirements: ["Proyecto de uso agricola", "Residencia en La Rioja"],
//     accepted: 1,
//     vacants: 4,
//     description: "Finca rustica con viñedos y zona boscosa. Perfecta para proyecto agricola o ecoturismo.",
//   },
//   {
//     id: "f3",
//     name: "Parcela Costa Brava",
//     owner: "Grupo Mediterráneo",
//     ownerAvatar: "https://i.pravatar.cc/80?img=44",
//     type: "Zona costera",
//     location: "Girona, Cataluña",
//     coordinates: { latitude: 41.9794, longitude: 2.8214 },
//     size: "650m2",
//     price: "320.000€",
//     image: "https://picsum.photos/seed/f3/600/300",
//     requirements: ["Capital mínimo 50.000€", "Sin propiedades en zona costera"],
//     accepted: 5,
//     vacants: 0,
//     description: "Parcela con vistas al mar en primera línea. Zona con alta revalorización y licencia de obra aprobada.",
//   },
//   {
//     id: "f4",
//     name: "Solar Industrial Zaragoza",
//     owner: "UBIKA Sistemas",
//     ownerAvatar: "https://i.pravatar.cc/80?img=55",
//     type: "Solar industrial",
//     location: "Zaragoza, Aragón",
//     coordinates: { latitude: 41.6488, longitude: -0.8891 },
//     size: "1.200m2",
//     price: "210.000€",
//     image: "https://picsum.photos/seed/f4/600/300",
//     requirements: ["Proyecto empresarial aprobado", "Mínimo 2 años de actividad"],
//     accepted: 2,
//     vacants: 3,
//     description: "Solar en polígono industrial consolidado. Acceso directo a autovía y servicios industriales completos.",
//   },
//   {
//     id: "f5",
//     name: "Huerta Valencia",
//     owner: "María Tortosa",
//     ownerAvatar: "https://i.pravatar.cc/80?img=21",
//     type: "Huerta",
//     location: "Valencia, C. Valenciana",
//     coordinates: { latitude: 39.4699, longitude: -0.3763 },
//     size: "2.1Ha",
//     price: "75.000€",
//     image: "https://picsum.photos/seed/f5/600/300",
//     requirements: ["Experiencia agricola", "Plan de cultivo presentado"],
//     accepted: 4,
//     vacants: 1,
//     description: "Huerta tradicional valenciana con sistema de riego incluido y acceso a acequia comunitaria.",
//   },
// ];

// export function ForoProvider({ children }) {
//   const [terrenos]    = useState(MOCK_TERRENOS_FORO);
//   const [favoritos,   setFavoritos]   = useState([]);
//   const [inscritos,   setInscritos]   = useState([]);

//   const toggleFavorito = (id) => {
//     setFavoritos(prev =>
//       prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
//     );
//   };

//   const toggleInscripcion = (id) => {
//     setInscritos(prev =>
//       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//     );
//   };

//   const isFavorito   = (id) => favoritos.includes(id);
//   const isInscrito   = (id) => inscritos.includes(id);

//   return (
//     <ForoContext.Provider value={{
//       terrenos,
//       favoritos,
//       inscritos,
//       toggleFavorito,
//       toggleInscripcion,
//       isFavorito,
//       isInscrito,
//     }}>
//       {children}
//     </ForoContext.Provider>
//   );
// }

// export function useForo() {
//   return useContext(ForoContext);
// }

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios"; // instancia Axios con interceptor de token

const ForoContext = createContext();

// ── Helpers API ───────────────────────────────────────────────────

/**
 * GET /api/foro
 * Lista los foros/grupos disponibles para unirse.
 */
const fetchForos = async () => {
  const response = await api.get("/foro");
  return response.data; // array de foros o { data: [...] }
};

/**
 * GET /api/foro/:id
 * Detalle de un foro en particular.
 */
const fetchForo = async (id) => {
  const response = await api.get(`/foro/${id}`);
  return response.data;
};

/**
 * POST /api/foro/unirse
 * Petición para unirse a un foro/grupo específico.
 * @param {string|number} foroId
 */
const unirseAForo = async (foroId) => {
  const response = await api.post("/foro/unirse", { foro_id: foroId });
  return response.data;
};

// ── Normalizar un foro recibido del backend ───────────────────────
// Ajusta las claves si el backend usa nombres distintos.
// ForoContext.js

// ── Normalizar un foro recibido del backend ───────────────────────
const normalizeForo = (raw) => ({
  id:           String(raw.id),
  // Priorizamos 'nombre' que es lo que Laravel suele usar en español
  name:         raw.nombre       ?? raw.name          ?? "Terreno sin nombre",
  
  // BUSQUEDA DEL PROPIETARIO: 
  // 1. Miramos si viene en el objeto 'user' (relación de Laravel)
  // 2. Miramos si viene como 'propietario' o 'owner' directamente
  owner:        raw.user?.name   ?? raw.propietario   ?? raw.owner ?? "Propietario Ubika",
  
  // Lo mismo para el Avatar
  ownerAvatar:  raw.user?.avatar ?? raw.owner_avatar ?? raw.ownerAvatar ?? "https://i.pravatar.cc/80",
  
  type:         raw.tipo         ?? raw.type          ?? "Urbano",
  location:     raw.ubicacion    ?? raw.location      ?? "Ubicación pendiente",
  
  // Coordenadas (Laravel suele mandarlas como lat/lng)
  coordinates: {
    latitude:  parseFloat(raw.lat ?? raw.latitude  ?? 40.4168),
    longitude: parseFloat(raw.lng ?? raw.longitude ?? -3.7038),
  },
  
  size:         raw.superficie   ?? raw.size          ?? "Consultar m²",
  price:        raw.precio       ?? raw.price         ?? "Consultar precio",
  image:        raw.imagen_url   ?? raw.image         ?? `https://picsum.photos/seed/${raw.id}/600/300`,
  
  requirements: Array.isArray(raw.requisitos) ? raw.requisitos
               : Array.isArray(raw.requirements) ? raw.requirements
               : [],
               
  accepted:     raw.aceptados    ?? raw.accepted      ?? 0,
  // Si el backend no envía vacantes, las calculamos nosotros: capacidad - aceptados
  vacants:      raw.vacantes     ?? (raw.capacidad_maxima ? (raw.capacidad_maxima - (raw.aceptados ?? 0)) : 0),
  
  description:  raw.descripcion  ?? raw.description   ?? "Sin descripción disponible.",
});

// ══════════════════════════════════════════════════════════════════
// PROVIDER
// ══════════════════════════════════════════════════════════════════
export function ForoProvider({ children }) {
  const [terrenos,  setTerrenos]  = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [inscritos, setInscritos] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  // ── Carga inicial ─────────────────────────────────────────────
  useEffect(() => {
    cargarForos();
  }, []);

  const cargarForos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchForos();

      // El backend puede devolver un array directo o { data: [...] }
      const lista = Array.isArray(data) ? data : (data.data ?? []);
      setTerrenos(lista.map(normalizeForo));
    } catch (err) {
      console.error("Error cargando foros:", err);
      setError("No se pudieron cargar los foros. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Recargar detalle de un foro concreto (opcional) ───────────
  const refrescarForo = useCallback(async (id) => {
    try {
      const data = await fetchForo(id);
      const actualizado = normalizeForo(data.foro ?? data);
      setTerrenos(prev =>
        prev.map(t => t.id === actualizado.id ? actualizado : t)
      );
      return actualizado;
    } catch (err) {
      console.error(`Error recargando foro ${id}:`, err);
      return null;
    }
  }, []);

  // ── Favoritos (local, sin endpoint de favoritos en la API) ────
  const toggleFavorito = useCallback((id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  // ── Inscripción via POST /api/foro/unirse ─────────────────────
  const toggleInscripcion = useCallback(async (id) => {
    const yaInscrito = inscritos.includes(id);

    // Optimistic update: cambia el estado local de inmediato
    setInscritos(prev =>
      yaInscrito ? prev.filter(i => i !== id) : [...prev, id]
    );

    // Actualiza el contador de vacantes localmente
    setTerrenos(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        return {
          ...t,
          accepted: yaInscrito ? t.accepted - 1 : t.accepted + 1,
          vacants:  yaInscrito ? t.vacants  + 1 : Math.max(0, t.vacants - 1),
        };
      })
    );

    // Solo llamar al backend al unirse (no hay endpoint de "desunirse" en la doc)
    if (!yaInscrito) {
      try {
        await unirseAForo(id);
        // Opcional: recargar el foro para sincronizar contadores reales
        await refrescarForo(id);
      } catch (err) {
        console.error("Error al unirse al foro:", err);
        // Revertir si el servidor rechaza
        setInscritos(prev => prev.filter(i => i !== id));
        setTerrenos(prev =>
          prev.map(t => {
            if (t.id !== id) return t;
            return {
              ...t,
              accepted: t.accepted - 1,
              vacants:  t.vacants  + 1,
            };
          })
        );
      }
    }
  }, [inscritos, refrescarForo]);

  const isFavorito  = useCallback((id) => favoritos.includes(id), [favoritos]);
  const isInscrito  = useCallback((id) => inscritos.includes(id), [inscritos]);

  return (
    <ForoContext.Provider value={{
      terrenos,
      favoritos,
      inscritos,
      loading,
      error,
      toggleFavorito,
      toggleInscripcion,
      isFavorito,
      isInscrito,
      cargarForos,       // para pull-to-refresh desde la pantalla
      refrescarForo,     // para recargar un foro individual tras ver su detalle
    }}>
      {children}
    </ForoContext.Provider>
  );
}

export function useForo() {
  return useContext(ForoContext);
}