import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';




const MessageItem = ({ auth,
    thread: { _id, text, name, avatar, user, messages, datasent, content },
    showActions }) => (

    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
                <h5></h5>
            </Link>
        </div>
        <div className="posttext">

            <p className="my-1">
                <div className="wrap">{content}</div>
            </p>
            <hr className="hrpost"></hr>
            <p className="post-date">Wysłano <Moment format='DD/MM/YYYY'>{datasent}</Moment></p>


        </div>
    </div>
);

MessageItem.defaultProps = {
    showActions: true
};

MessageItem.propTypes = {
    thread: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MessageItem)
