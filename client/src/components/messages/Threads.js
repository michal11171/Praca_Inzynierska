import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import { getThreads } from '../../actions/message';

const Threads = ({ getThreads, thread: { threads }, auth }) => {
    useEffect(() => {
        getThreads();
    }, [getThreads]);

    return (

        <Fragment>
            <h1 className="large text-primary">Rozmowy</h1>
            <p className="lead">
                <i className="fas fa-hammer" /> Wiadomosci
            </p>
            {(auth.user ? (auth.user.ban === "true") : false) && (
                <div className="baninfo">
                    <div className="ban1">Twoje konto zostało zablokowane.</div>
                    <div className="ban2">Nie możesz dodawać nowych ogłoszeń.</div>
                </div>)}

            <div className="posts">
                {threads ? threads.map((thread) => (
                    <MessageItem key={thread._id} thread={thread} />
                )) : null}
            </div>

        </Fragment>
    );
};


Threads.propTypes = {
    getThreads: PropTypes.func.isRequired,
    threads: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    thread: state.thread,
    auth: state.auth
});

export default connect(mapStateToProps, { getThreads })(Threads);
