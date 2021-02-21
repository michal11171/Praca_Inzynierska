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
    }, [getGroup, match.params.id]);

    const setData = () => {
        setFormData({
            name: loading || !group.name ? '' : group.name,
            description: loading || !group.description ? '' : group.description,
            user: loading || !group.user ? '' : group.user,
            status: loading || !group.status ? '' : group.status,
            admin: loading || !group.admin ? '' : group.admin
        });
    };

    useEffect(() => {
        if (group !== null) setData();
    }, [group]);

    console.log(group);

    const { name, description, status } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return group === null || loading ? (
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
                        <label className="grouplabel">Nazwa grupy</label>
                        <input
                            type='text'
                            placeholder="Wpisz nazwę grupy"
                            name='name'
                            required
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="grouplabel">Opis</label>
                        <textarea
                            name='description'
                            cols='30'
                            rows='5'
                            placeholder="Opisz czego będzie dotyczyć ta grupa"
                            value={description}
                            onChange={e => onChange(e)}
                        ></textarea>
                    </Form.Field>
                    <Form.Field>

                    </Form.Field>
                    <Button type='submit'>Zatwierdź</Button>
                </Form>
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