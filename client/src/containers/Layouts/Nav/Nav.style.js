import styled from 'styled-components';

export const StyledNav = styled.nav`
  position: fixed;
  right: 0;
  width: var(--nav-width);
  height: 100vh;
  background: var(--nav-color);
  box-shadow: -0.2rem .3rem 0.4rem var(--shadow);
  transition: 0.5s cubic-bezier(0.6, 0.07, 0.07, 1.08);
  z-index: 5;
  transform: translateX(${({ navOpen }) => (navOpen ? 0 : '28rem')});
`;

