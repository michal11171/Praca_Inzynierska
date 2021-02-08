import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    const [mias, setMias] = useState('');
    const [inp, setInp] = useState('');
    const Profilsy = (profiles)
    const result = Object.values(Profilsy);
    let profiless = result.filter(profile => profile.location.toLowerCase().includes(inp.toLowerCase()));
    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Użytkownicy</h1>
            <p className="lead"><i className="fas fa-users"></i> Twoi potencjalni pracodawcy/pracownicy </p>
            <div className='control' style={{ minWidth: "300px" }}>
                <h3>Wyszukaj po lokalizacji:</h3>
                <div className="filtrdiv">
                    <input className="filtr" onChange={e => {

                        //CaleM = alert(CaleM + mias);
                        let input = e.target.value;
                        setMias(input);
                        setInp(input);

                        setMias(profiless);
                    }} style={{ width: "100%" }} placeholder='Wpisz nazwę miasta' type='text' />
                </div>
            </div>

            <div className="profiles">
                {profiles.length > 0 ? (
                    profiless.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>Nie znaleziono żadnych użytkowników</h4>}
            </div>
        </Fragment>}
    </Fragment>;
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
