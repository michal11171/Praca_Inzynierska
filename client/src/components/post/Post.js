import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost, getPosts } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match, auth }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>Wróć do ogłoszeń</Link>
        <PostItem post={post} showActions={false} />
        {(auth.user ? (auth.user.ban === "false") : (false)) && (
            <CommentForm postId={post._id} />)}
        {(auth.user ? (auth.user.ban === "true") : (false)) && (
            <div className="baninfo">
                <div className="ban1">Twoje konto zostało zablokowane.</div>
                <div className="ban2">Nie możesz dodawać komentarzy.</div>
            </div>)}
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post)
