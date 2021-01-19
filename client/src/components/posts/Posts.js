import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { post } from 'request';

const Posts = ({ getPosts, post: { posts } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    const Posty = (posts)
    const arryayPosts = Object.values(Posty);
    console.log(arryayPosts);
    const result = arryayPosts.filter(post => post.types === "praca");
    console.log(result);

    return (

        <Fragment>
            <h1 className="large text-primary">Ogłoszenia</h1>
            <p className="lead">
                <i className="fas fa-user" /> Znajdź coś dla siebie!
      </p>

            <PostForm />



            <div className="posts">
                {result.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>

        </Fragment>
    );
};



Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);