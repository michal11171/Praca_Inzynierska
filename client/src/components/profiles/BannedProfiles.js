import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';


const BannedProfiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    const Profiles = (profiles)
    const arryayProfiles = Object.values(Profiles);
    const result = arryayProfiles.filter(profile => profile.user.ban === "true");

    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Zablokowani użytkownicy</h1>

            <div className="profiles">
                {profiles.length > 0 ? (
                    result.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>Nie znaleziono żadnych użytkowników</h4>}
            </div>
        </Fragment>}
    </Fragment>;
}

BannedProfiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(BannedProfiles);
