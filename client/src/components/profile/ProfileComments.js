import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/profile';

const ProfileComments = ({
    profileId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">
                {text}
            </p>
            <p className="post-date">
                Dodano <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>


            {(!auth.loading && user === auth.user._id) && (auth.user.admin === "false") && (
                <button onClick={e => deleteComment(profileId, _id)}
                    type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            )}

            {(auth.user ? (auth.user.admin === "true") : (false)) && (
                <button onClick={e => deleteComment(profileId, _id)}
                    type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div>
    </div>
);

ProfileComments.propTypes = {
    profileId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(ProfileComments)
