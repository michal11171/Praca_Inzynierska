import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFormData] = useState({
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Uzupełnij swój profil
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Dodaj trochę informacji o sobie
      </p>
            <small>* = Pole wymagane</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Wybierz swój status</option>
                        <option value="Uczeń">Uczeń</option>
                        <option value="Student">Student</option>
                        <option value="Bezrobotny">Bezrobotny</option>
                        <option value="Inne">Inne</option>
                    </select>
                    <small className="form-text"
                    >Poinformuj potencjalnego pracodawcę o swoim statusie</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Miasto" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Miasto w którym przebywasz</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Umiejętności" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Poszczególne umiejętności oddziel przecinkiem (np. Spawacz, Hydraulik, Glazurnik)</small
                    >
                </div>

                <div className="form-group">
                    <textarea placeholder="Krótki opis Ciebie" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Opowiedz nam coś o sobie</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Dodaj swoje socialmedia
                    </button>
                    <span>Opcjonalne</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Link do Twojego Twittera" name="twitter" value={twitter} onChange={e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Link do Twojego Facebooka" name="facebook" value={facebook} onChange={e => onChange(e)} />
                    </div>


                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Link do Twojego LinkedIna" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                    </div>
                </Fragment>}



                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Wróć</Link>
            </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};



export default connect(null, { createProfile })(withRouter(CreateProfile));
