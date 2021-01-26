import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getGroup, editGroup } from '../../actions/group';
import { Button, Form, Radio, Label, Icon } from 'semantic-ui-react';

const EditGroup = ({
    group: { group, loading },
    editGroup,
    getGroup,
    history,
    match
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        user: '',
        status: null,
        admin: ''
    });

    useEffect(() => {
        getGroup(match.params.id);
        setFormData({
            name: loading || !group || !group.name ? '' : group.name,
            description:
                loading || !group || !group.description ? '' : group.description,
            user: loading || !group || !group.user ? '' : group.user,
            status: loading || !group || !group.status ? '' : group.status,
            admin: loading || !group || !group.admin ? '' : group.admin
        });

        //console.log(group);
    }, [loading, getGroup, match.params.id]);

    const { name, description, status } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            {group === null || loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <h1 class='large textcustom'>Edytuj grupę</h1>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                editGroup(match.params.id, formData, history);
                            }}
                        >
                            <Form.Field>
                                <label>Nazwa grupy</label>
                                <input
                                    type='text'
                                    placeholder="Podaj nazwę grupy"
                                    name='name'
                                    required
                                    value={name}
                                    onChange={e => onChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Opis</label>
                                <textarea
                                    name='description'
                                    cols='30'
                                    rows='5'
                                    placeholder="Opisz jakiego rodzaju posty będą zamieszczane na grupie"
                                    value={description}
                                    onChange={e => onChange(e)}
                                ></textarea>
                            </Form.Field>
                            <Form.Field>
                                <Label>
                                    <Radio
                                        toggle
                                        checked={status}
                                        value={status}
                                        name='status'
                                        onChange={e => {
                                            setFormData({ ...formData, status: !status });
                                        }}
                                    />
                                    <Icon circular name='key' color='blue'></Icon>Prywatna
              </Label>
                            </Form.Field>
                            <Button type='submit'>Zapisz zmiany</Button>
                        </Form>
                    </Fragment>
                )}
        </Fragment>
    );
};

EditGroup.propTypes = {
    editGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps, { getGroup, editGroup })(
    withRouter(EditGroup)
);