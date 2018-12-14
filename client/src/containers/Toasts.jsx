import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeToast } from '../redux/actions'; 
import Toast from '../components/Toast';

const Toasts = ({ toasts, removeToast }) => (
  ReactDOM.createPortal(
    <StyledToasts>
      {
        toasts.map(({ id, type, message }, i) => (
          <Toast 
            key={i}
            onClick={() => removeToast(id)} 
            onAnimationEnd={() => removeToast(id)}
            type={type}
          >
            {message}
          </Toast>
        ))
      }
    </StyledToasts>,
    document.getElementById('toastsMount')
  )
);

const StyledToasts = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 0;
  width: 30rem;
  z-index: 5;
`;

const mapStateToProps = ({ global: { toasts } }) => ({ toasts });
export default connect(mapStateToProps, { removeToast })(Toasts);
