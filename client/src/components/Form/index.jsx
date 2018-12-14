import React from 'react';
import styled from 'styled-components';
import  { mainColor } from '../../resources/themeVariables';
import PropTypes from 'prop-types';
import GoogleSignIn from '../../containers/Auth/GoogleSignIn';

const StyledForm = styled.form`
  width: 100%;
  max-width: 48rem;
  height: auto;
  background: white;
  margin: 4rem auto 0 auto;
  box-shadow: 0 0 .8rem rgba(0, 0, 0, .2);
  padding: 3rem;
  text-align: center;
  border-radius: .3rem;
  user-select: none;
  color: ${mainColor};
  border-top-right-radius: 5rem;
  border-bottom-right-radius: 5rem;

  legend {
    font-size: 3rem;
    margin-bottom: ${({ withGoogleSignIn }) => withGoogleSignIn ? 0 : '2rem'};
    letter-spacing: -.1rem;
    font-weight: 100;

    &::after {
      content: '';
      display: block;
      width: 78%;
      height: .2rem;
      margin: .1rem auto;
      background-color: ${mainColor};
    }
  }

  button[type="submit"] {
    display: block;
    width: 100%;
    background-color: var(--success-color);
    border: .1rem solid var(--success-color);
    color: white;
    font-size: 1.7rem;
    padding: 1.3rem 0;
    cursor: pointer;
    margin-top: 1rem;
    letter-spacing: .1rem;
    border-radius: .3rem;
    transition: .3s;
    outline: none;
  }
`;

const Form = props => {
  const { legendValue, icon, buttonValue, children, withGoogleSignIn } = props;
  return (
    <StyledForm onSubmit={props.onSubmit} withGoogleSignIn={withGoogleSignIn}>
      <div className="header">
        <i className={icon}></i>
        <legend>{legendValue}</legend>
        {withGoogleSignIn && <GoogleSignIn />}
      </div>
      {children}
      <button formNoValidate type='submit'>{buttonValue}</button>
    </StyledForm>
  );
}

Form.propTypes = {
  legendValue: PropTypes.string.isRequired,
  icon: PropTypes.string,
  buttonValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

Form.defaultProps = {
  icon: 'far fa-smile'
}

export default Form;