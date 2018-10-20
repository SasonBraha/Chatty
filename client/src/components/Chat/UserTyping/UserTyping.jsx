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
  background: #000C21;
  margin-left: .5rem;
  animation: ${Bounce} .7s infinite ease-in-out alternate;
  animation-delay: ${({ animationDelay }) => `${animationDelay}s`};
`;

const Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  background: 'white',
  padding: '2rem',
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '100%',
  zIndex: '2'
}

const UserTyping = ({ typingUsers }) => (
  typingUsers.length ? (
    <div style={Style}>
      <StyledDot animationDelay={-0.32}></StyledDot>
      <StyledDot animationDelay={-0.16}></StyledDot>
      <StyledDot animationDelay={0}></StyledDot>
    </div>
  ) : (
    null
  )
);
  
const mapStateToProps = ({ chat: { typingUsers } }) => ({ typingUsers });
export default connect(mapStateToProps, null)(UserTyping);
