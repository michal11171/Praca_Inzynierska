import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Nie siedź bezczynnie</h1>
          <p className="lead">
            Załóż konto i znajdź interesującą pracę
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Zarejestruj się</Link>
            <Link to="/login" className="btn btn-light">Logowanie</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing;