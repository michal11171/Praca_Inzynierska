import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <div className="registerform">
        <div className="headers">
          <h1 className="large text-primary">Logowanie</h1>
          <p className="lead"><i className="fas fa-user"></i> Zaloguj się do swojego konta</p>
        </div>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Adres Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={e => onChange(e)}
              name="password"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Zaloguj" />
        </form>
        <p className="my-1">
          Nie masz jeszcze konta? <Link to="/register"> Zarejestruj się!</Link>
        </p>
      </div>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);