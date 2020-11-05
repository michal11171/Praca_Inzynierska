  import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
            console.log('Hasłą nie są takie same');
        }
        else {
            console.log('SUCCESS');
        }
    } ;

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
            onChange={e => onChange(e)} 
            required />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Adres Email" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)} 
            required/>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Powtórz hasło"
            value={password2} 
            onChange={e => onChange(e)}
            name="password2"
            minLength="6"
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
export default Register;