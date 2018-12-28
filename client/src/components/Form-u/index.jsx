import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = props => (
  <StyledForm {...props}>
    <StyledFormHeader>
      <StyledHeaderIcon className={`${props.icon}`} />
      {props.header}
    </StyledFormHeader>

    {props.children}
  </StyledForm>
);

const StyledForm = styled.form`
  max-width: 70%;
  margin: 0 auto;

  @media (max-width: 700px) {
    max-width: 100%;
  }
`;

const StyledFormHeader = styled.header`
  font-size: 3rem;
  letter-spacing: -.1rem;
  text-align: center;
  font-weight: 300;
  color: #343434;
  line-height: 2rem;
  text-transform: capitalize;

  &:after {
    content: '';
    display: block;
    margin: 1.5rem auto 0 auto;
    width: 73%;
    height: .2rem;
    background: var(--main-color);
    margin-bottom: 3.3rem;
  }
`;

const StyledHeaderIcon = styled.i`
  color: currentColor;
  display: block;
  margin: 0 auto 1rem auto;
  font-size: 8rem;
`;

Form.propTypes = {
  icon: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
}

export default Form;