import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

class Container extends Component {
  state = {
    shouldShrink: window.innerWidth > 992 ? true : false,
  };

  handleResize = () => {
    if (!this.state.shouldShrink && window.innerWidth > 992)
      this.setState({ shouldShrink: true });
    if (this.state.shouldShrink && window.innerWidth < 992)
      this.setState({ shouldShrink: false });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <main>
        <StyledContainer
          navOpen={this.props.isNavOpen}
          shouldShrink={this.state.shouldShrink}
        >
          {this.props.children}
        </StyledContainer>
      </main>
    );
  }
}

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
