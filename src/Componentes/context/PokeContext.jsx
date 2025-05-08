import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const PokeContext = createContext();

// El proveedor del contexto
export const PokeProvider = ({ children }) => {
  // Estado global
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [loading, setLoading] = useState(true); // Estado de carga
  const [favoritos, setFavoritos] = useState([]); // Estado de favoritos

  // UseEffect para obtener los Pokémon según el tipo seleccionado
  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true); // Activamos el estado de carga
      let url = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

      if (tipoSeleccionado !== 'All') {
        url = `https://pokeapi.co/api/v2/type/${tipoSeleccionado}`;
      }

      try {
        const res = await fetch(url);
        const json = await res.json();
        if (tipoSeleccionado === 'All') {
          setData(json.results);
        } else {
          const listaFiltrada = json.pokemon.map(p => p.pokemon);
          setData(listaFiltrada);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false); // Desactivamos el estado de carga
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  // Obtener los favoritos desde el localStorage al cargar la página
  useEffect(() => {
    const favoritosStorage = localStorage.getItem('favoritos');
    if (favoritosStorage) {
      setFavoritos(JSON.parse(favoritosStorage)); // Convertimos la cadena JSON a un array
    }
  }, []);

  // Función para manejar el cambio del tipo seleccionado
  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  // Función para manejar la búsqueda
  const handleBusquedaChange = (busqueda) => {
    setBusqueda(busqueda);
  };

  // Función para agregar o eliminar favoritos
  const toggleFavorito = (pokemon) => {
    setFavoritos(prevFavoritos => {
      const nuevosFavoritos = prevFavoritos.some(fav => fav.id === pokemon.id)
        ? prevFavoritos.filter(fav => fav.id !== pokemon.id) // Elimina el favorito
        : [...prevFavoritos, pokemon]; // Agrega el favorito

      // Guardamos los favoritos en el localStorage
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

      return nuevosFavoritos;
    });
  };

  return (
    <PokeContext.Provider
      value={{
        data,
        busqueda,
        tipoSeleccionado,
        loading,
        favoritos,
        handleTipoChange,
        handleBusquedaChange,
        toggleFavorito, // Proveemos la función toggleFavorito
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

// Hook personalizado para usar el contexto en cualquier componente
export const usePokeContext = () => {
  return useContext(PokeContext);
};
