import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { shadowColor } from './Ui/theme/variables';
import { resetDropdown } from '../redux/actions';
import { connect } from 'react-redux';

const StyledDropdown = styled.div`
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  box-shadow: 0 0.4rem 0.7rem ${shadowColor};
  position: absolute;
  transition: all 0.15s, transform 0.2s;
  transform-origin: left top;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(.5)')};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  min-width: 20rem;
  z-index: 9999;
  overflow-y: auto;

  ${({ width }) => width && css`
    width: ${width}
  `}
`;

class Dropdown extends Component {
  componentDidUpdate() {
    this.props.isOpen
      ? document.body.addEventListener('click', this.props.resetDropdown)
      : document.body.removeEventListener('click', this.props.resetDropdown)
  }

  render() {
    return (
      <StyledDropdown {...this.props}>{this.props.children}</StyledDropdown>
    )
  }
}

Dropdown.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  isOpen: PropTypes.bool,
  width: PropTypes.string
};

Dropdown.defaultProps = {
  background: 'white',
  color: 'black',
  top: 0,
  left: 0,
  isOpen: true
};

export default connect(null, { resetDropdown })(Dropdown);
