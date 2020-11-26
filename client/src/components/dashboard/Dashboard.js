import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (<Spinner />) : (<Fragment>
        <h1 className="large text-primary">Panel użytkownika</h1>
        <p className="lead"><i className="fas fa-user"></i> Witaj {user && user.name}</p>
        {profile !== null ? (
            <Fragment>
                has
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
