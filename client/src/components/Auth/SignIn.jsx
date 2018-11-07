import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../Form';
import Field from '../Form/Field';
import { loginUser } from '../../redux/actions';
import guestOnly from '../Hoc/guestOnly';
import { Helmet } from 'react-helmet';

class Login extends Component {
  state = {
    displayName: '',
    password: ''
  }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>התחברות</title>
        </Helmet>
        <Form 
          legendValue='התחברות'
          icon='fa fa-user-circle fa-5x'
          buttonValue='התחברות' 
          onSubmit={this.handleSubmit}
          withGoogleSignIn
        >
          <Field
            labelValue='שם משתמש / דואר אלקטרוני'
            name='displayName'
            value={this.state.displayName}
            type='text'
            onChange={this.onChange}
            icon= 'fas fa-user'
          />

          <Field 
            labelValue='סיסמה'
            name='password'
            value={this.state.password}
            type='password'
            onChange={this.onChange}
            icon='fas fa-lock'
          />
        </Form>
      </>  
    );
  }
}

export default connect(null, { loginUser })(guestOnly(Login));
