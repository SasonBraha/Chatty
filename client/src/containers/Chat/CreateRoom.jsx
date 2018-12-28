import React, { Component } from 'react'
import Modal from '../../components/Modal';
import { Field, reduxForm } from 'redux-form';
import Form from '../../components/Form-u';
import FormGroup from '../../components/Form-u/FormGroup';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { resetModals } from '../../redux/actions';

class CreateRoom extends Component {
  renderInput({ input, label, icon, meta: { error, touched } }) {
    const { name } = input;
    return (
      <FormGroup 
        input={input}
        name={name}
        label={label}
        icon={icon}
        error={touched && error}
      />
    );
  }

  onSubmit = formValues => {
    console.log(formValues);
  }

  render() {
    const { showCreateRoomModal, handleSubmit, resetModals } = this.props;
    return (
      <Modal isOpen={showCreateRoomModal}>
        <Form
          icon="fas fa-comments"
          header="צור חדר חדש"
          onSubmit={handleSubmit(this.onSubmit)}
          noValidate
        >
          <Field 
            name="name"
            label="שם החדר"
            icon="fas fa-comment-alt"
            component={this.renderInput}
          />

          <Button
            color="white"
            background="var(--main-color)"
            type="submit"
          >
            צור חדר חדש
          </Button>

          <Button
            color="white"
            background="var(--danger-color)"
            type="button"
            onClick={resetModals}
          >
            ביטול
          </Button>



        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ chat: { showCreateRoomModal } }) => ({ showCreateRoomModal });
export default connect(
  mapStateToProps,
  { resetModals }
)(reduxForm({
  form: 'createRoom'
})(CreateRoom))
