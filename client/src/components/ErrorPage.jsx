import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const errorMessages = {
  403: 'לחשבונך אין מספיק גישות על מנת לצפות בדף זה',
  404: 'הדף שביקשת לא קיים במערכת',
  500: 'אוי! משהו השתבש',
};

const ErrorPage = ({ statusCode = 404 }) => (
  <StyledErrorPageContainer>
    <StyledStatusCode>{statusCode}</StyledStatusCode>
    <StyledErrorMessage>{errorMessages[statusCode]}</StyledErrorMessage>
  </StyledErrorPageContainer>
);

const StyledErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #000000a1;
`;

const StyledStatusCode = styled.span`
  font-size: 5rem;
  color: red;
  font-weight: bold;
`;

const StyledErrorMessage = styled.span`
  font-size: 3rem;
  color: black;
  text-align: center;
  color: white;
`;

ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default ErrorPage;
