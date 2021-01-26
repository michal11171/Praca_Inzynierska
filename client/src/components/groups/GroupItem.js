import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { getProfileById } from '../../actions/profile';
import {
    Card,
    Label,
    Image,
    Icon,
    Segment,
    Header,
    Modal,
    Button,
    Grid
} from 'semantic-ui-react';
import { deleteGroup, addMember, removeMember } from '../../actions/group';

const GroupItem = ({
    addMember,
    removeMember,
    deleteGroup,
    getProfileById,
    auth: { user },
    profile: { profile, loading },
    group: { _id, name, status, description, members, admin, group },
    post: { posts },
    getPosts
}) => {
    useEffect(() => {
        getProfileById(admin);
    }, [getProfileById, admin]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    //Show only posts of this group
    const result = posts.filter(post => post.type === _id);

    //const resultM = members.filter(group => group.members === user._id )

    const [open, setOpen] = React.useState(false);

    return loading && profile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <Card>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{status === true ? 'Prywatna' : 'Publiczna'}</Card.Meta>
                        <Card.Description>{description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {members.length} Członków
          </a>
                    </Card.Content>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button>Pokaż więcej</Button>}
                    >
                        <Modal.Header>{name}</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <Grid columns='equal' divided container>
                                    <Grid.Row stretched>
                                        <Grid.Column>
                                            <Segment vertical>
                                                <Label color={'green'}>Admin:</Label>
                                                <Link to={`/profile/${admin}`}>
                                                    <Label>Właściciel: </Label>
                                                </Link>
                                            </Segment>

                                            <Segment vertical>
                                                <Label>Opis:</Label>
                                                {' ' + description}
                                                <br />
                                            </Segment>
                                            <Segment vertical>
                                                {members.find(members => members.user === user._id) ? (
                                                    <Button
                                                        onClick={e => removeMember(_id)}
                                                        type='button'
                                                        color='red'
                                                    >
                                                        Opuść grupę
                                                    </Button>
                                                ) : (
                                                        <Button
                                                            onClick={e => addMember(_id)}
                                                            type='button'
                                                            color='olive'
                                                        >
                                                            Dołącz
                                                        </Button>
                                                    )}
                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row stretched>
                                        <Grid.Column>
                                            <div className='postactions'>
                                                {status === true &&
                                                    !members.find(members => members.user === user._id) ? (
                                                        <div className="boxes">
                                                            <Segment>

                                                                <Header>

                                                                    Grupa jest prywatna. Dołącz do niej aby zobaczyć zawartość
                                                            </Header>

                                                            </Segment>
                                                        </div>
                                                    ) : (
                                                        <div className="boxes">
                                                            <Segment>
                                                                {members.find(
                                                                    members => members.user === user._id
                                                                ) ? (
                                                                        <PostForm id={_id} />
                                                                    ) : null}
                                                                <div className='posts'>
                                                                    {result.map(post => (
                                                                        <PostItem key={post._id} post={post} />
                                                                    ))}
                                                                </div>
                                                            </Segment>
                                                        </div>
                                                    )}
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            {user._id === admin ? (
                                <Link to={`/edit-group/${_id}`} className='ui grey button'>
                                    Edytuj
                                </Link>
                            ) : null}
                            {user._id === admin ? (
                                <button
                                    onClick={() => deleteGroup(_id)}
                                    className='ui negative button'
                                >
                                    Usuń
                                </button>
                            ) : null}
                            <Button primary onClick={() => setOpen(false)}>
                                Zamknij <Icon name='right chevron' />
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Card>
            </Fragment>
        );
};

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    removeMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {
    addMember,
    getPosts,
    getProfileById,
    deleteGroup,
    removeMember
})(GroupItem);