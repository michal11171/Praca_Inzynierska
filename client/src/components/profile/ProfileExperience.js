import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({ experience: {
    company,
    title,
    location,
    current,
    to,
    from,
    description
} }) => <div>
        <h3 className="text-dark">{company}</h3>
        <p>
            <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? ' Do teraz' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
        </p>
        <p>
            <strong>Stanowisko: </strong> {title}
        </p>
        <p>
            <strong>Opis: </strong> {description}
        </p>
    </div>

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default ProfileExperience
