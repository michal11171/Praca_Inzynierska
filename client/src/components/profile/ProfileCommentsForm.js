import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/profile';

const ProfileCommentsForm = ({ profileId, addComment }) => {
    const [text, setText] = useState('');


    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Oceń tego użytkownika</h3>
            </div>
            <form class="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment(profileId, { text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Podaj trochę informacji..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Dodaj" />
            </form>
        </div>
    )
}

ProfileCommentsForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(ProfileCommentsForm)
