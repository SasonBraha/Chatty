import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 5.5rem);
  transition: 0.5s cubic-bezier(0.6, 0.07, 0.07, 1.08);
  will-change: width;
  overflow: auto;

  ${({ navOpen, windowWidth }) =>
    navOpen &&
    windowWidth > 992 &&
    css`
      transform: translateX(-25rem);
      width: calc(100% - 25rem);
    `};
`;

class Container extends Component {
  state = {
    windowWidth: window.innerWidth
  };

  componentDidMount() {
    window.onresize = () => this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    return (
      <StyledContainer
        navOpen={this.props.isNavOpen}
        windowWidth={this.state.windowWidth}
      >
        {this.props.children}
      </StyledContainer>
    );
  }
}

const mapStateToProps = ({ root: { nav: { isNavOpen } } }) => ({ isNavOpen });
export default connect(mapStateToProps, null)(Container);
