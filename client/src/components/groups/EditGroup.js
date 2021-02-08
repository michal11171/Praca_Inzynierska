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
        getGroup(match.params.id).then(() => {
            console.log({ ...group });
            setFormData({
                name: '',
                description: '',
                user: '',
                status: '',
                admin: ''
                //console.log(group);
            });
        });
    }, [loading, getGroup, match.params.id]);

    const { name, description, status } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return group === null || loading ? (
        <Spinner />
    ) : (
            <Fragment>
                <h1 className='large textcustom'>Edytuj grupę</h1>
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
                            placeholder="Nazwa grupy"
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
                            placeholder="Opisz czego będzie dotyczyć ta grupa"
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
                    <Button type='submit'>Zapisz</Button>
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
