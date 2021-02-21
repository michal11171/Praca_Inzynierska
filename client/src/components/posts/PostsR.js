import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { post } from 'request';
import { Checkbox } from 'semantic-ui-react';

const PostsR = ({ getPosts, post: { posts }, auth: { user } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    const [mias, setMias] = useState('');
    const Posty = (posts)
    const arryayPosts = Object.values(Posty);
    const [rodzaj, setRodzaj] = useState('wszystko');
    const CaleM = '';
    const miasto = "Wrocław";
    const result = arryayPosts.filter(post => !post.type && post.reports.length > 0);



    const [inp, setInp] = useState('');
    let miasta = result.filter(post => post.location.toLowerCase().includes(inp.toLowerCase()));
    const miastaW = result.filter(post => post.location.toLowerCase().includes(inp.toLowerCase()));
    const miastaS = result.filter(post => post.location.toLowerCase().includes(inp.toLowerCase()) && post.typeOS === "szukam");
    const miastaO = result.filter(post => post.location.toLowerCase().includes(inp.toLowerCase()) && post.typeOS === "oferuje");
    if (rodzaj === "wszystko") { miasta = miastaW };
    if (rodzaj === "szukam") { miasta = miastaS };
    if (rodzaj === "oferuje") { miasta = miastaO };
    return (

        <Fragment>
            <h1 className="large text-primary">Zgłoszenia</h1>




            <div className="posts">
                {miasta.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>

        </Fragment>
    );
};



PostsR.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(PostsR);
