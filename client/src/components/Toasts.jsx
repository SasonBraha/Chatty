import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { removeToast } from '../redux/actions'; 

const fadeOut = keyframes`
  from { 
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledToasts = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 0;
  width: 30rem;
  z-index: 5;
`;

const Toast = styled.div`
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, .9);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: white;
  animation: ${fadeOut} 2s forwards 3s;
  border-radius: .5rem;
  transition: .3s;
  transform: translateY(1rem);
`;

const Toasts = ({ toasts, removeToast }) => 
  <StyledToasts>
    {
      toasts.map(({ msg, id }, i) => (
        <Toast 
          key={i}
          id={id}
          onClick={e => removeToast(e.target.id)} 
          onAnimationEnd={e => removeToast(e.target.id)}
        >
          {msg}
        </Toast>
      ))
    }
  </StyledToasts>

const mapStateToProps = ({ root: { toasts } }) => ({ toasts });
export default connect(mapStateToProps, { removeToast })(Toasts);
