import React from 'react';
import Modal from '../../components/Modal';
import { Field, reduxForm } from 'redux-form';
import Form from '../../components/Form-u';
import TextInput from '../../components/Form-u/TextInput';
import FileInput from '../../components/Form-u/FileInput';
import Select from '../../components/Form-u/Select';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { resetModals, createChatRoom } from '../../redux/actions';

const CreateRoom = ({
  showCreateRoomModal,
  handleSubmit,
  resetModals,
  createChatRoom,
}) => (
  <Modal isOpen={showCreateRoomModal}>
    <Form
      icon="fas fa-comments"
      header="צור חדר חדש"
      onSubmit={handleSubmit(createChatRoom)}
      noValidate
    >
      <Field
        name="name"
        label="שם החדר"
        icon="fas fa-comment-alt"
        component={props => (
          <TextInput
            {...props}
            error={props.meta.error && props.meta.touched}
          />
        )}
      />

      <Field
        name="isPrivate"
        component={props => (
          <Select {...props.input}>
            <option disabled hidden value="">
              סוג החדר
            </option>
            <option value="true">פרטי</option>
            <option value="false">ציבורי</option>
          </Select>
        )}
      />

      <Field
        name="storeMessages"
        component={props => (
          <Select {...props.input}>
            <option disabled hidden value="">
              היסטוריית הודעות
            </option>
            <option value="true">שמור הודעות בחדר זה</option>
            <option value="false">אל תשמור הודעות בחדר זה</option>
          </Select>
        )}
      />

      <Field
        name="image"
        label="תמונה"
        accept="image/*"
        component={props => <FileInput {...props} />}
      />

      <Button color="white" background="var(--main-color)" type="submit">
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

const mapStateToProps = ({ chat: { showCreateRoomModal } }) => ({
  showCreateRoomModal,
});
export default connect(
  mapStateToProps,
  { resetModals, createChatRoom }
)(
  reduxForm({
    form: 'createRoom',
  })(CreateRoom)
);
