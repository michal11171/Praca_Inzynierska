import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-briefcase"></i> FindJob</Link>
        </h1>
        <ul>
          <li><a href="profiles.html">Twoi potencjalni pracodawcy</a></li>
          <li><Link to="/register">Rejestracja</Link></li>
          <li><Link to="/login">Logowanie</Link></li>
        </ul>
      </nav>
    )
}

export default Navbar;