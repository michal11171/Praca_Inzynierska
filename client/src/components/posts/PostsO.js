import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { post } from 'request';

const PostsO = ({ getPosts, post: { posts } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    const [mias, setMias] = useState('');
    const Posty = (posts)
    const arryayPosts = Object.values(Posty);

    const CaleM = '';
    const miasto = "Wrocław";
    const result = arryayPosts.filter(post => post.types === "usluga");

    const [inp, setInp] = useState('');
    console.log("III: ", inp);
    const miasta = result.filter(post => post.location.toLowerCase().includes(inp.toLowerCase()));
    console.log("Miasto pofiltrowane:", miasta);
    return (

        <Fragment>
            <h1 className="large text-primary">Ogłoszenia</h1>
            <p className="lead">
                <i className="fas fa-user" /> Znajdź coś dla siebie!
      </p>

            <PostForm />


            <div className='control' style={{ minWidth: "300px" }}>
                <h3>Wyszukaj ogłoszenia po lokalizacji:</h3>
                <div className="filtrdiv">
                    <input class="filtr" onChange={e => {

                        //CaleM = alert(CaleM + mias);
                        let input = e.target.value;
                        setMias(input);
                        setInp(input);


                        // {
                        //     result.map((post) => (
                        //         <PostItem key={post._id} post={post} />
                        //     ))
                        // }
                        setMias(miasta);
                    }} style={{ width: "100%" }} placeholder='Wpisz nazwę miasta' type='text' />
                </div>
            </div>



            <div className="posts">
                {miasta.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>

        </Fragment>
    );
};



PostsO.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(PostsO);