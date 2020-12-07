import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? ('Do teraz') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger'>Usuń</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Twoje dotychczasowe doświadczenie</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Firma</th>
                        <th className="hide-sm">Rodzaj pracy</th>
                        <th className="hide-sm">Lata pracy</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default Experience
