import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addMessage, getThread } from '../../actions/message';

const MessageForm = ({ thread, addMessage, threadReceiver, getThread }) => {
    const [text, setText] = useState('');

    const handleOnSubmit = e => {
        e.preventDefault();

        addMessage(thread?.thread?.thread?._id, { content: text }).then(() => {
            getThread(threadReceiver._id);
        });
        setText('');
    }
    return (
        <div className="post-form" style={{ height: '220px' }}>

            <form className="form my-1" onSubmit={handleOnSubmit}>
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
    addMessage: PropTypes.func.isRequired,
    getThread: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    thread: state.thread
});


export default connect(mapStateToProps, { addMessage, getThread })(MessageForm)
