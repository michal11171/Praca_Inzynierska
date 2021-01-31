import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (<Spinner />) : (<Fragment>
        <h1 className="large text-primary">Panel użytkownika</h1>
        <p className="lead"><i className="fas fa-user"></i> Witaj {user && user.name}</p>
        {(user ? (user.ban === "true") : (false)) && (<div class="baninfo">Twoje konto zostało zablokowane.
            <br></br>Ograniczyliśmy także możliwość edycji Twojego profilu.</div>)}
        {profile !== null ? (
            <Fragment>
                {(user ? (user.ban === "false") : (false)) && (
                    <DashboardActions />)}
                <Experience experience={profile.experience} />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus"> Usuń konto</i>
                    </button>
                </div>
            </Fragment>
        ) : (
                <Fragment>
                    <p> Nie uzupełniłeś jeszcze swojego profilu. Możesz zrobić to w każdej chwili. </p>
                    <Link to='/create-profile' className="btn btn-primary my-1">Uzupełnij profil</Link>
                </Fragment>
            )}
    </Fragment>);

};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
