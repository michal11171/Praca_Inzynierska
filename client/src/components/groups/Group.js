import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import GroupItem from './GroupItem';
import { getGroups } from '../../actions/group';
import {
    Card,
    Container,
    Header,
    Icon,
    Label,
    Grid,
    Button,
    Comment
} from 'semantic-ui-react';

const Group = ({ getGroups, group: { groups, loading } }) => {
    useEffect(() => {
        getGroups();
    }, [getGroups]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <Container text>
                            <Grid columns='equal'>
                                <Grid.Column width={4}>
                                    <Link to='/add-group'>
                                        <Button color='green'>Stwórz grupę</Button>
                                    </Link>
                                </Grid.Column>
                                <Grid.Column stretched>

                                </Grid.Column>
                            </Grid>
                            <Header as='h2' icon textAlign='center'>

                                <Header.Content className="grupynazwa">Grupy</Header.Content>
                            </Header>
                            <Card.Group centered itemsPerRow={3}>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                        <Fragment>
                                            {groups.length > 0 ? (
                                                groups.map(group => (
                                                    <GroupItem key={group._id} group={group} />
                                                ))
                                            ) : (
                                                    <h4 className="groupsnotfound">Nie znaleziono grup.</h4>
                                                )}
                                        </Fragment>
                                    )}
                            </Card.Group>
                        </Container>
                    </Fragment>
                )}
        </Fragment>
    );
};

Group.propTypes = {
    getGroups: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps, { getGroups })(Group);