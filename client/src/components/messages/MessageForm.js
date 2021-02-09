import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addMessage } from '../../actions/message';

const MessageForm = ({ threadId, addMessage }) => {
    const [text, setText] = useState('');


    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Napisz do tego użytkownika</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addMessage(threadId, { text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Dodaj trochę informacji..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Dodaj" />
            </form>
        </div>
    )
}

MessageForm.propTypes = {
    addMessage: PropTypes.func.isRequired
}

export default connect(null, { addMessage })(MessageForm)
