import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addGroup } from '../../actions/group';
import {
    Button,
    Progress,
    Form,
    Checkbox,
    Grid,
    Label,
    Icon
} from 'semantic-ui-react';

const AddGroup = ({
    addGroup,
    history,
    getCurrentProfile,
    profile: { profile }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        user: '',
        status: false,
        admin: ''
    });

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const setAdmin = () => setFormData({ ...formData, admin: profile.user._id });
    //const setMember = () => setFormData({...formData, id: groupAdmin})

    const { name, description, user, status, admin } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });





    return (
        <Fragment>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    addGroup(formData, history);
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
                        <Checkbox
                            toggle
                            value={status}
                            name='status'
                            onChange={e => {
                                setFormData({ ...formData, status: !status });
                            }}
                        />
                        <Icon circular name='key' color='blue'></Icon>Prywatna
          </Label>
                </Form.Field>

                <Button type='submit' onClick={setAdmin}>
                    Utwórz
        </Button>
            </Form>
        </Fragment>
    );
};

AddGroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {
    addGroup,
    getCurrentProfile
})(withRouter(AddGroup));