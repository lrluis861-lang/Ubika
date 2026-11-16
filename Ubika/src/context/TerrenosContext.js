import React, { createContext, useContext, useState } from "react";

const TerrenosContext = createContext();

const INITIAL_TERRENOS = [
  { id: "1", name: "Solar Centro", location: "Madrid",   size: "320m2", status: "owned",    image: "https://picsum.photos/seed/t1/400/200" },
  { id: "2", name: "Finca Norte",  location: "Burgos",   size: "1.2Ha", status: "reserved", image: "https://picsum.photos/seed/t2/400/200" },
  { id: "3", name: "Parcela Sur",  location: "Sevilla",  size: "540m2", status: "owned",    image: "https://picsum.photos/seed/t3/400/200" },
  { id: "4", name: "Lote Este",    location: "Valencia", size: "210m2", status: "owned",    image: "https://picsum.photos/seed/t4/400/200" },
];

export function TerrenosProvider({ children }) {
  const [terrenos, setTerrenos] = useState(INITIAL_TERRENOS);

  const addTerreno = (terreno) => {
    setTerrenos(prev => [
      ...prev,
      {
        ...terreno,
        id:    Date.now().toString(),
        image: `https://picsum.photos/seed/${Date.now()}/400/200`,
      },
    ]);
  };

  const removeTerreno = (id) => {
    setTerrenos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TerrenosContext.Provider value={{ terrenos, addTerreno, removeTerreno }}>
      {children}
    </TerrenosContext.Provider>
  );
}

export function useTerrenos() {
  return useContext(TerrenosContext);
}