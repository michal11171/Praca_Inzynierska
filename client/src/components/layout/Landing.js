import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to='/dasboard' />
  }

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

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);