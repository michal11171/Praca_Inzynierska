import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [formData, setFormData] = useState({
        text: '',
        types: '',
        title: ''
    });
    const { text, types, title } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Dodaj ogłoszenie</h3>
            </div>
            <form class="form my-1" onSubmit={e => {
                e.preventDefault();
                addPost({ text, types, title });
                setFormData({
                    text: '',
                    types: '',
                    title: ''
                });


            }}>
                <select name="types" placeholder="typ pracy" value={types} onChange={e => onChange(e)}>
                    <option value="0">* Wybierz rodzaj ogłoszenia</option>
                    <option value="praca">Szukam/oferuję pracę dorywczą</option>
                    <option value="usluga">Oferuję usługę</option>
                </select>
                <input type="text" placeholder="Podaj Tytuł" name="title" value={title} onChange={e => onChange(e)} />
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Opisz czego dotyczy twój wpis"
                    value={text}
                    onChange={e => onChange(e)}
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Dodaj" />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm)
