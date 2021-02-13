import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addMessage } from '../../actions/message';

const MessageForm = ({ thread, addMessage }) => {
    const [text, setText] = useState('');


    return (
        <div className="post-form" style={{ height: '220px' }}>

            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                console.log("AA", thread)
                addMessage(thread?.thread?.thread?._id, { content: text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Wpisz treść wiadomości..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-dark my-1">Wyślij</button>
            </form>
        </div>
    )
}

MessageForm.propTypes = {
    addMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    thread: state.thread
});


export default connect(mapStateToProps, { addMessage })(MessageForm)
