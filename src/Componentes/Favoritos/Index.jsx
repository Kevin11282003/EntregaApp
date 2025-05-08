import { usePokeContext } from '../context/PokeContext';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Favoritos() {
  const { favoritos } = usePokeContext(); // Obtenemos los Pokémon favoritos del contexto
  const navigate = useNavigate();

  if (favoritos.length === 0) {
    return <div>No tienes Pokémon favoritos aún.</div>;
  }

  return (
    <section className="c-lista">
      {favoritos.map((pokemon, index) => (
        <div
          className="c-lista-pokemon"
          onClick={() => navigate(`/detalle/${pokemon.name}`)}
          key={index}
        >
          <p>{pokemon.name}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={`Pokémon ${pokemon.name}`}
            width="auto"
            height="60"
            loading="lazy"
          />
        </div>
      ))}
    </section>
  );
}

export default Favoritos;
