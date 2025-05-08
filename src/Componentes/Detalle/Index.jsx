import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style.css';
import { usePokeContext } from '../context/PokeContext'; // Importamos el contexto

function Detalle() {
  const [datapoke, setDatapoke] = useState({});
  const { name } = useParams();
  const { favoritos, toggleFavorito } = usePokeContext(); // Obtenemos favoritos y la función toggleFavorito

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]);

  // Desestructuramos la respuesta de la API para tener acceso fácil a los datos
  const { id, name: pokeName, height, weight, types, abilities, stats } = datapoke;

  // Función para mostrar los tipos
  const showTypes = types ? types.map(type => type.type.name).join(', ') : 'N/A';

  // Función para mostrar habilidades
  const showAbilities = abilities ? abilities.map(ability => ability.ability.name).join(', ') : 'N/A';

  // Función para mostrar estadísticas
  const showStats = stats ? stats.map(stat => (
    <p key={stat.stat.name}>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}</p>
  )) : [];

  // Verificamos si este Pokémon está en los favoritos
  const isFavorito = favoritos.some(fav => fav.id === id);

  return (
    <div className="poke-detail">
      <h2>{pokeName ? pokeName.toUpperCase() : 'Cargando...'}</h2>

      {id && (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={pokeName}
          width="200"
        />
      )}

      <div className="poke-info">
        <p>ID: {id}</p>
        <p>Altura: {height ? height / 10 : 'N/A'} m / Peso: {weight ? weight / 10 : 'N/A'} kg</p>
        <p>Tipo(s): {showTypes}</p>
        <p>Habilidades: {showAbilities}</p>
        <div className="poke-stats">
          {showStats}
        </div>
      </div>

      {/* Botón para agregar o eliminar de favoritos */}
      <button onClick={() => toggleFavorito(datapoke)} className={`favorito-btn ${isFavorito ? 'is-favorito' : ''}`}>
        {isFavorito ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
}

export default Detalle;
