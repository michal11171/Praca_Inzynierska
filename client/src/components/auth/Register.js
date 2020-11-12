import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Hasłą nie są takie same', 'danger');
        }
        else {
            register({name, email, password});
        }
    } ;

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Rejestracja</h1>
      <p className="lead"><i className="fas fa-user"></i> Stwórz swoje konto</p>
      <form className="form" onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Imię" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Adres Email" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Hasło"
            value={password} 
            onChange={e => onChange(e)}
            name="password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Powtórz hasło"
            value={password2} 
            onChange={e => onChange(e)}
            name="password2"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Zarejestruj" />
      </form>
      <p className="my-1">
        Posiadasz już konto? <Link to="/login">Zaloguj się</Link>
      </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);