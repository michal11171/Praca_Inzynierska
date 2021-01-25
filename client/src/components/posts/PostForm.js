import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, id }) => {
    const [formData, setFormData] = useState({
        text: '',
        types: '',
        title: '',
        typeOS: '',
        type: '',
    });
    const [er, setEr] = useState('');
    const { text, types, title, typeOS } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Dodaj ogłoszenie</h3>
            </div>
            <form class="form my-1" onSubmit={e => {
                e.preventDefault();
                if (types !== '' && typeOS !== '') { addPost({ text, types, title, typeOS, type: id }); setEr(''); } else { setEr("Uzupełnij czego dotyczy twoje ogłoszenie/rodzaj ogłoszenia!") }
                setFormData({
                    text: '',
                    types: '',
                    title: '',
                    typeOS: '',
                    type: ''
                });


            }}>
                <select name="types" placeholder="typ pracy" value={types} onChange={e => onChange(e)} >
                    <option value="0">* Wybierz czego dotyczy twoje ogłoszenie</option>
                    <option value="praca">Praca</option>
                    <option value="usluga">Usługa</option>
                </select>
                <br></br>
                <select name="typeOS" placeholder="szukam/oferuje" value={typeOS} onChange={e => onChange(e)} >
                    <option value="0">* Wybierz rodzaj ogłoszenia</option>
                    <option value="szukam">Szukam</option>
                    <option value="oferuje">Oferuję</option>
                </select>
                <br></br>
                <input type="text" placeholder="Podaj tytuł" name="title" value={title} onChange={e => onChange(e)} required />
                <br></br>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Opisz czego dotyczy twoje ogłoszenie"
                    value={text}
                    onChange={e => onChange(e)}
                    required
                ></textarea>
                <div className="errpost">
                    {er}
                </div>
                <input type="submit" class="btn btn-dark my-1" value="Dodaj" />

            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm)
