import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import Form from '../../components/Form';
import Field from '../../components/Form/Field';
import Helmet from 'react-helmet';  
import guestOnly from '../Hoc/guestOnly'; 
import Recaptcha from 'react-google-invisible-recaptcha';
import { GOOGLE_RECAPTCHA_SITE_KEY } from '../../utils/config';
 
class Register extends Component {
  state = {
    values: {
      displayName: '',
      email: '',
      password: '',
      verifyPassword: '',
      recaptchaResponse: ''
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
    this.recaptcha.execute();
  }

  onCaptchaResolve = _ => {
    this.setState({
      values: {
        ...this.state.values,
        recaptchaResponse: this.recaptcha.getResponse()
      }
    }, () => this.props.registerUser(this.state.values, this.recaptcha));
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
          withGoogleSignIn
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

          <Recaptcha 
            ref={el => this.recaptcha = el}
            sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
            onResolved={this.onCaptchaResolve}
            locale="he"
          />
        </Form>
      </>
    );
  }
}

const mapStateToProps = ({ global: { form: { errors } } }) => ({ errors });
export default connect(mapStateToProps, { registerUser })(guestOnly(Register));


