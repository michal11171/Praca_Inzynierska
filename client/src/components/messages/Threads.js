import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import MessageForm from './MessageForm';
import { getThreads } from '../../actions/message';
import { post } from 'request';
import { Checkbox } from 'semantic-ui-react';

const Threads = ({ getThreads, threads, auth }) => {
    useEffect(() => {
        getThreads();
    }, [getThreads]);
    const [mias, setMias] = useState('');
    const Threadsy = (threads)
    const arryayPosts = Object.values(Threadsy);

    return (

        <Fragment>
            <h1 className="large text-primary">Rozmowy</h1>
            <p className="lead">
                <i className="fas fa-hammer" /> Wiadomosci
      </p>




            {(auth.user ? (auth.user.ban === "false") : (false)) && (
                <MessageForm />)}

            {(auth.user ? (auth.user.ban === "true") : (false)) && (
                <div className="baninfo">
                    <div className="ban1">Twoje konto zostało zablokowane.</div>
                    <div className="ban2">Nie możesz dodawać nowych ogłoszeń.</div>
                </div>)}

            <div className="posts">
                {arryayPosts.map((threads) => (
                    <MessageItem key={threads._id} threads={threads} />
                ))}
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
    threads: state.threads,
    auth: state.auth
});

export default connect(mapStateToProps, { getThreads })(Threads);
