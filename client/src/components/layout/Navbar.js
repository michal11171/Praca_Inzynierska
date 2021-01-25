import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';




const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Użytkownicy
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Oferty pracy
        </Link>
      </li>
      <li>
        <Link to="/postsO">
          Oferty usług
        </Link>
      </li>
      <li><Link to='/groups'>
        Grupy</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm"> Panel użytkownika</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Wyloguj</span>
        </a>
      </li>

    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Twoi potencjalni pracodawcy</Link></li>
      <li><Link to="/register">Rejestracja</Link></li>
      <li><Link to="/login">Logowanie</Link></li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-briefcase"></i> Dorabiaj.pl</Link>
      </h1>
      { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);