import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import { getProfileById, addLikeP, removeLikeP } from '../../actions/profile';
import ProfileComments from './ProfileComments';
import ProfileCommentsForm from './ProfileCommentsForm';

const Profile = ({ addLikeP, removeLikeP, getProfileById,
    profile: { profile, loading, _id, likes },
    auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);


    return (
        <Fragment Fragment >
            { profile === null || loading ? <Spinner /> : <Fragment>
                <Link to='/profiles' className='btn btn-ligth'>
                    Przeglądaj wszystkie profile
                </Link>
                {auth.isAuthenticated && auth.loading === false &&
                    auth.user._id === profile.user._id &&
                    (<Link to="/edit-profile" className="btn btn-dark">Edytuj profil</Link>)}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Doświadczenie</h2>
                        {profile.experience.length > 0 ? (<Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience} />
                            ))}
                        </Fragment>) : (<h4> Nie podano informacji o poprzednich miejscach pracy. </h4>)}
                    </div>
                </div>

                {(<Fragment>
                    <a className="likeuser">Czy ten użytkownik Ci pomógł?</a>
                    <button onClick={e => addLikeP(profile._id)} type="button" class="btn btn-light">

                        <i class="fas fa-thumbs-up"></i> {' '}
                        {profile.likes.length > 0 && (
                            <span>{profile.likes.length}</span>
                        )}

                    </button>
                    <button onClick={e => removeLikeP(profile._id)} type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                    </button>

                </Fragment>)}
                <br></br>
                <br></br>
                <ProfileCommentsForm profileId={profile._id} />
                <div className="comments">
                    {profile.comments.map(comment => (
                        <ProfileComments key={comment._id} comment={comment} profileId={profile._id} />
                    ))}
                </div>
            </Fragment>}
        </Fragment >
    )
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLikeP: PropTypes.func.isRequired,
    removeLikeP: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { addLikeP, removeLikeP, getProfileById })(Profile)
