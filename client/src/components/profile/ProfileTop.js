import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const ProfileTop = ({ profile: {
    status,
    company,
    location,
    social,
    user: { name, avatar, admin, _id }
} }) => {
    return (

        <div className="profile-top bg-primary p-2">
            <Link to={`/profile/${_id}/message`}>
                <button className="btn btn-default btn-circle"><i className="fas fa-envelope" />Wyślij wiadomość</button>
            </Link>
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />
            <h1 className="large">{name}</h1>

            <p className="lead">{admin !== "true" ? (status) : ("Administrator")} {company && <span>at {company}</span>} </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x" />
                    </a>)}
                {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x" />
                    </a>)}
                {social && social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x" />
                    </a>)}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop
