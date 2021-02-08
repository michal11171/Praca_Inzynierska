import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name, ban }
} }) => <div className="profile-about bg-light p-2">
        {bio && (
            <Fragment>
                { (ban ? (ban === "true") : (false)) && (
                    <div className="profilebaninfo">
                        Użytkownik został zablokowany za nieodpowiednie zachowanie.
                    </div>)}
                <h2 className="text-primary">{name.trim().split(' ')[0]} chce Ci powiedzieć coś o sobie!</h2>
                <p>{bio}</p>
            </Fragment>
        )}

        <div className="line"></div>
        <h2 className="text-primary">Umiejętności</h2>
        <div className="skills">
            {skills.map((skill, index) => (
                <div key={index} className="p-1">
                    <i className="fas fa-check"></i> {skill}
                </div>
            ))}
        </div>
    </div>


ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout
