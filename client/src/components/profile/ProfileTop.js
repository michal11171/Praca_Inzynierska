import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: {
    status,
    company,
    location,
    social,
    user: { name, avatar, admin }
} }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />
            <h1 className="large">{name}</h1>
            {console.log("ADMINL ", admin)}
            <p className="lead">{admin !== "true" ? (status) : ("Administrator")} {company && <span>at {company}</span>} </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>)}
                {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>)}
                {social && social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>)}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop
