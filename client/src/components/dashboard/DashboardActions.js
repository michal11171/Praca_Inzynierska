import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edytuj profil</Link>
            <Link to="/add-experience" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Dodaj wcześniejsze miejsca pracy</Link>
        </div>
    )
}

export default DashboardActions
