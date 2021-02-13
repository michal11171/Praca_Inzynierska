import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';


const MessageItem = ({ auth, thread }) => {
    const [threadReceiver, setThreadReceiver] = useState(null);
    useEffect(() => {
        if (thread.user1 === auth.user._id) {
            setThreadReceiver(thread.user2);
        } else {
            setThreadReceiver(thread.user1);
        }
    }, [thread]);
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${threadReceiver?._id}/message`}>{threadReceiver?.name}</Link>
                <Link to={`/profile/${threadReceiver?._id}/message`}>
                    <img
                        className="round-img"
                        src=""
                        alt=""
                    />
                    <h4>{ }</h4>
                </Link>
            </div>
            <div className="posttext">

                <p className="my-1">
                    <div className="wrap">{ }</div>
                </p>
                <hr className="hrpost" />
                <p className="post-date">Wysłano <Moment format='DD/MM/YYYY'>{ }</Moment></p>
                {console.log()}

            </div>
        </div>
    );
}

MessageItem.propTypes = {
    thread: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MessageItem)
