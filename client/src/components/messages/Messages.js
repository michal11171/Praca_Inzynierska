import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getThread } from '../../actions/message';
import MessageForm from './MessageForm';


const Messages = ({ thread: { thread }, getThread, match, auth, }) => {
    useEffect(() => {
        getThread(match.params.id);
    }, [getThread, match.params.id]);
    const [threadReceiver, setThreadReceiver] = useState(null);
    useEffect(() => {
        console.log("DUPA", thread);
        console.log("SIUR", thread?.thread.user1);

        if (thread) {
            if (thread.thread.user1._id === auth.user._id) {
                setThreadReceiver(thread.thread.user2);
            } else {
                setThreadReceiver(thread.thread.user1);
            }

        }
    }, [thread]);

    return (
        <div>
            <div className="messageusername">
                Rozmowa z {threadReceiver?.name}
            </div>
            <div className="messages__container">
                <div className="messages__wrapper">
                    {thread ? thread.messages.map((message) => {
                        return message.sender === auth.user._id ? (
                            <div className="message__wrapper">
                                <div key={message._id} className="message1">
                                    {message.content}
                                </div>
                            </div>
                        ) : (
                                <div className="message__wrapper">
                                    <div key={message._id} className="message2">
                                        {message.content}
                                    </div>
                                </div>
                            )
                    }) : null}
                </div>
                <div className="message__form">
                    <MessageForm />
                </div>
            </div>
        </div>
    )
}
//
// Messages.propTypes = {
//     getThreads: PropTypes.func.isRequired,
//     deleteAccount: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth,
    thread: state.thread
});


export default connect(mapStateToProps, { getThread })(Messages);
