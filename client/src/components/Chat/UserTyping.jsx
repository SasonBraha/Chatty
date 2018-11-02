import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const Bounce = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const StyledDot = styled.div`
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: white;
  margin-left: .5rem;
  animation: ${Bounce} .7s infinite ease-in-out alternate;
  animation-delay: ${({ animationDelay }) => `${animationDelay}s`};
`;

const StyledUserTyping = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  padding: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;

const UserTyping = ({ typingUsers }) => (
  typingUsers.length ? (
    <StyledUserTyping>
      <StyledDot animationDelay={-0.32}></StyledDot>
      <StyledDot animationDelay={-0.16}></StyledDot>
      <StyledDot animationDelay={0}></StyledDot>
    </StyledUserTyping>
  ): <></>
);
  
const mapStateToProps = ({ chat: { typingUsers } }) => ({ typingUsers });
export default connect(mapStateToProps, null)(UserTyping);
