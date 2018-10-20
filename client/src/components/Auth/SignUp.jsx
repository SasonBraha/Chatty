import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import Form from '../Form/Form';
import Field from '../Form/Field';
import Helmet from 'react-helmet'; 
import guestOnly from '../Hoc/guestOnly'; 

class Register extends Component {
  state = {
    values: {
      displayName: '',
      email: '',
      password: '',
      verifyPassword: ''
    }, 
    errors: {}
  }

  onChange = e => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.registerUser(this.state.values).catch(errors => this.setState({ errors }));
  }
  
  render() {
    const { errors } = this.props;
    return (
      <>
        <Helmet>
          <title>הרשמה</title>
        </Helmet>
        <Form
          legendValue='הרשמה'
          icon='fa fa-user-circle fa-5x'
          buttonValue='הרשמה' 
          onSubmit={this.handleSubmit}
        >
          <Field 
            name='displayName'
            value={this.state.values.displayName}
            type='text'
            onChange={this.onChange}
            error={errors.displayName}
            labelValue='שם משתמש'
            icon= 'fas fa-user'
          />

          <Field 
            name='email'
            value={this.state.values.email}
            type='text'
            onChange={this.onChange}
            error={errors.email}
            labelValue='דואר אלקטרוני'
            icon='fas fa-envelope-open'
          />

          <Field 
            name='password'
            value={this.state.values.password}
            type='password'
            onChange={this.onChange}
            error={errors.password}
            labelValue='סיסמה'
            icon="fas fa-lock"
          />

          <Field 
            name='verifyPassword'
            value={this.state.values.verifyPassword}
            type='password'
            onChange={this.onChange}
            error={errors.verifyPassword}
            labelValue='וודא סיסמה'
            icon='fas fa-check-circle'
          />
        </Form>
      </>
    );
  }
}

const mapStateToProps = ({ root: { form: { errors } } }) => ({ errors });
export default connect(mapStateToProps, { registerUser })(guestOnly(Register));


