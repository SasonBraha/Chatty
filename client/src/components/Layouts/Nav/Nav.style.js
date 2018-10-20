import styled from 'styled-components';
import { $mainColor } from '../../Ui/theme/variables';
import GoogleLogin from 'react-google-login';

export const StyledNav = styled.nav`
  position: fixed;
  right: 0;
  width: 25rem;
  height: 100vh;
  background: ${$mainColor};
  box-shadow: -0.2rem .3rem 0.4rem rgba(0, 0, 0, .2);
  transition: 0.5s cubic-bezier(0.6, 0.07, 0.07, 1.08);
  z-index: 5;
  transform: translateX(${({ navOpen }) => (navOpen ? 0 : '28rem')});
`;

export const StyledGoogleLogin = styled(GoogleLogin)`
  padding: 1rem 2rem;
  text-align: center;
  background: white;
  color: black;
  border-radius: 0.5rem;
  margin-top: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  letter-spacing: .03rem;
  outline: none;
  transition: .3s;
  box-shadow: 0 0 .3rem .3rem transparent;

  &:hover {
    box-shadow: 0 0 .3rem .3rem rgba(66,133,244,.3);
    background: #eee;
  }
`;
