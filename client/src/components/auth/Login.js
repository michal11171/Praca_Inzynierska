import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();

        console.log('SUCCESS');
     };

    return (
        <Fragment>
            <h1 className="large text-primary">Logowanie</h1>
      <p className="lead"><i className="fas fa-user"></i> Zaloguj się do swojego konta</p>
      <form className="form" onSubmit = {e => onSubmit(e)}>
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
        <input type="submit" className="btn btn-primary" value="Zaloguj" />
      </form>
      <p className="my-1">
        Nie masz jeszcze konta? <Link to="/register"> Zarejestruj się!</Link>
      </p>
        </Fragment>
    )
}
export default Login;