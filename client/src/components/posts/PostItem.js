import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addFavourites, removeFavourites, reportPost, unreportPost } from '../../actions/post';
import post from '../../reducers/post';



const PostItem = ({ addLike, removeLike, addFavourites, removeFavourites, deletePost, reportPost, unreportPost, auth,
    post: { _id, text, name, avatar, user, likes, comments, date, location, title, typeOS, favourites, reports, from, to, rate },
    showActions }) => (

    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
                <h5></h5>
            </Link>
        </div>
        <div className="posttext">

            <p className="posttypes wrap" >{title}</p>
            <p className="my-1">
                <div className="wrap">{text}</div>
            </p>
            <hr className="hrpost"></hr>
            <p className="postloc">
                Lokalizacja: {location}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             Okres trwania:&nbsp;{
                    from ? (
                        <Moment format='DD/MM/YYYY'>{from}</Moment>) : ("Nie podano daty rozpoczęcia")

                }&nbsp; - &nbsp;{
                    to ? (
                        <Moment format='DD/MM/YYYY'>{to}</Moment>) : ("Nie podano daty zakończenia")
                }
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             Stawka: {
                    rate ? (rate) : ("Brak")
                }
            </p>
            <p className="post-date">Dodano <Moment format='DD/MM/YYYY'>{date}</Moment></p>

            {showActions && (<Fragment>
                <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i> {' '}
                    {likes.length > 0 && (
                        <span>{likes.length}</span>
                    )}
                </button>
                {/* <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button> */}
                <button onClick={e => addFavourites(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-star"></i> {' '}
                    {favourites.length > 0 && (
                        <span>{favourites.length}</span>
                    )}
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Skomentowało: <span className='comment-count'>{comments.length}</span>

                </Link>
                {(!auth.loading && user === auth.user._id) && (
                    <button onClick={e => deletePost(_id)}
                        type="button" className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
                {(!auth.loading && user === auth.user._id) || (auth.user ? (auth.user.admin === "true") : (false)) && (
                    <button onClick={e => deletePost(_id)}
                        type="button" className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
                {!auth.loading && user !== auth.user._id && auth.user.admin === "false" && !reports.find(report => report.user === auth.user._id) && (
                    <button onClick={e => reportPost(_id)} type="button" className="btn btn-danger">

                        {console.log()}
                        <i className="fas fa-exclamation-triangle"></i>
                    </button>
                )}
                {!auth.loading && auth.user.admin === "true" && reports.length > 0 && (
                    <button onClick={e => unreportPost(_id)} type="button" className="btn btn-submit">
                        <i className="fas fa-check"></i>
                    </button>
                )}

            </Fragment>)}



        </div>
    </div>
);

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addFavourites: PropTypes.func.isRequired,
    removeFavourites: PropTypes.func.isRequired,
    reportPost: PropTypes.func.isRequired,
    unreportPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, addFavourites, removeFavourites, reportPost, unreportPost })(PostItem)
