import styled from 'styled-components';
import { $mainColor } from '../../../resources/themeVariables';

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

