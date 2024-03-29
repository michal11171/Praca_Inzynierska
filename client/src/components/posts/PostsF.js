import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { post } from 'request';
import { Checkbox } from 'semantic-ui-react';

const Posts = ({ getPosts, post: { posts }, auth: { user } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    const [mias, setMias] = useState('');
    const Posty = (posts)
    const arryayPosts = Object.values(Posty);
    const [rodzaj, setRodzaj] = useState('wszystko');
    const CaleM = '';
    const miasto = "Wrocław";
    const result = arryayPosts.filter(post => !post.type && post.favourites.find(favourites => favourites.user === user._id));



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
            <h1 className="large text-primary">Ulubione</h1>
            <p className="lead">
                <i className="fas fa-star" /> Ogłoszenia dodane do ulubionych
      </p>


            <div className="check">
                <h3>Wybierz rodzaj ogłoszenia:</h3>
                <input type="radio" id="wszystko" name="szukam" value="wszystko" onClick={e => { setRodzaj(e.target.value) }}></input>
                <label for="wszystko"> Wszystkie ogłoszenia</label> <br></br>
                <input type="radio" id="szukam" name="szukam" value="szukam" onClick={e => { setRodzaj(e.target.value) }}></input>
                <label for="szukam"> Szukam</label> <br></br>
                <input type="radio" id="oferuje" name="szukam" value="oferuje" onClick={e => { setRodzaj(e.target.value) }}></input>
                <label for="oferuje"> Oferuję</label>
            </div>

            <div className='control' style={{ minWidth: "300px" }}>
                <h3>Wyszukaj po lokalizacji:</h3>
                <div className="filtrdiv">
                    <input className="filtr" onChange={e => {


                        let input = e.target.value;
                        setMias(input);
                        setInp(input);



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



Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
