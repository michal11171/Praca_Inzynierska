import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';




const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {

  const authLinks = (

    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" />{' '}
          Użytkownicy
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-hammer" />{' '}
          Oferty pracy
        </Link>
      </li>
      <li>
        <Link to="/postsO">
          <i className="fas fa-brush" />{' '}
          Oferty usług
        </Link>
      </li>
      <li><Link to='/groups'>
        <i className="fas fa-object-group" />{' '}
        Grupy</Link>
      </li>
      <li><Link to='/postsF'>
        <i className="fas fa-star" />{' '}
        Ulubione</Link>
      </li>
      {(user ? (user.admin === "true") : (false)) && (<li><Link to='/postsR'>
        <i className="fas fa-exclamation-triangle" />{' '}
        Zgłoszenia</Link>
      </li>)}
      {(user ? (user.admin === "true") : (false)) && (<li><Link to='/bannedprofiles'>
        <i className="fas fa-ban" />{' '}
        Zablokowani</Link>
      </li>)}

      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm"> Panel użytkownika</span>
        </Link>
      </li>
      {(!!user) && (
        <li>
          <Link to={`/profile/${user._id}`}>
            <i className="fas fa-user" />{' '}
            <span className="hide-sm"> Mój profil</span>
          </Link>
        </li>)}
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
      <li><Link to="/profiles"><i className="fas fa-users" />{' '}Potencjalni pracodawcy</Link></li>
      <li><Link to="/register"><i className="fas fa-user" />{' '}Rejestracja</Link></li>
      <li><Link to="/login"><i className="fas fa-sign-in-alt" />{' '}Logowanie</Link></li>

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
