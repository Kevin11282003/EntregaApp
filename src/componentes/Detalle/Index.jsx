import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom"; 
import { AppContext } from '../../contexto/contexto';
import './Style.css'; // Asegúrate de que este archivo contiene el CSS que pasaste

function Detalle() {
  const { name } = useParams(); 
  const [datapoke, setDatapoke] = useState([]);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const esFavorito = favoritos.some(p => p.id === datapoke.id);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]); 

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== datapoke.id));
    } else {
      setFavoritos([...favoritos, { id: datapoke.id, nombre: datapoke.name }]);
    }
  };

  if (!datapoke || !datapoke.id) return <p>Cargando...</p>;

  return (
    <div className="container">
      <div className="poke-detail">
        <h2>{datapoke.name}</h2>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} 
          alt={datapoke.name} 
          width="200"
        />

        <div className="poke-info">
          <p><span>ID:</span> {datapoke.id}</p>
          {datapoke.types && (
            <p><span>Tipo(s):</span> {datapoke.types.map(t => t.type.name).join(', ')}</p>
          )}
          <p><span>Altura:</span> {datapoke.height / 10} m</p>
          <p><span>Peso:</span> {datapoke.weight / 10} kg</p>
        </div>

        <div className="poke-stats">
          <p><span>HP:</span> {datapoke.stats[0].base_stat}</p>
          <p><span>Velocidad:</span> {datapoke.stats[5].base_stat}</p>
          <p><span>Ataque:</span> {datapoke.stats[1].base_stat}</p>
          <p><span>Defensa:</span> {datapoke.stats[2].base_stat}</p>
          <p><span>Ataque Especial:</span> {datapoke.stats[3].base_stat}</p>
          <p><span>Defensa Especial:</span> {datapoke.stats[4].base_stat}</p>
        </div>

        <button onClick={toggleFavorito}>
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

export default Detalle;
