import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const Container = props => {
  const [shouldShrink, setShouldShrink] = useState(window.innerWidth > 992);
  useEffect(() => {
    window.onresize = () => {
      const windowWidth = window.innerWidth;
      if (!shouldShrink && windowWidth > 992) {
        setShouldShrink(true);
      } else if (shouldShrink && windowWidth < 992) {
        setShouldShrink(false);
      }
    };
  });

  return (
    <main>
      <StyledContainer navOpen={props.isNavOpen} shouldShrink={shouldShrink}>
        {props.children}
      </StyledContainer>
    </main>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height));
  transition: 0.5s cubic-bezier(0.6, 0.07, 0.07, 1.08);
  will-change: width;
  overflow: auto;

  ${({ navOpen, shouldShrink }) =>
    navOpen &&
    shouldShrink &&
    css`
      transform: translateX(calc(-1 * var(--nav-width)));
      width: calc(100% - var(--nav-width));
    `};
`;

const mapStateToProps = ({
  global: {
    nav: { isNavOpen },
  },
}) => ({ isNavOpen });
export default connect(
  mapStateToProps,
  null
)(Container);
