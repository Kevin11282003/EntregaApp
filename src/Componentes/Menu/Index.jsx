import { useState } from 'react'
import './Style.css'
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom'


function Menu() {
  return (

      <nav className="c-menu">
        <Link to="/Listar">Listar</Link>
        <Link to="/Detalle">Detalle</Link>
        <Link to="/Aleatorios">Aleatorio</Link>
        <Link to="/Favoritos">Favoritos</Link>
        <Link to="/Original">Original</Link>
        <Link to="/Usuario">Usuario</Link>
      </nav>
  
  )
}

export default Menu