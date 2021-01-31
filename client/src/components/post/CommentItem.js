import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date, location },
    auth,
    deleteComment
}) => (
    <div class="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    class="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p class="my-1">
                {text}
            </p>
            <p class="post-date">
                Dodano <Moment format='DD/MM/YYYY'>{date}</Moment>
                <p className="commentloc">Lokalizacja: {location}</p>
            </p>


            {(!auth.loading && user === auth.user._id) && (auth.user.admin === "false") && (
                <button onClick={e => deleteComment(postId, _id)}
                    type="button" class="btn btn-danger">
                    <i class="fas fa-times"></i>
                </button>
            )}

            {(auth.user ? (auth.user.admin === "true") : (false)) && (
                <button onClick={e => deleteComment(postId, _id)}
                    type="button" class="btn btn-danger">
                    <i class="fas fa-times"></i>
                </button>
            )}


        </div>
    </div>
);

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem)
