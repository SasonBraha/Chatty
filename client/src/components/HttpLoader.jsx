import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  border: .35rem solid rgba(255, 255, 255, .1);
  border-top-color: ${({ color }) => color};
  animation: ${Rotate} 1s infinite forwards linear;
  border-radius: 50%;
  position: absolute;
  right: 50%;
`;

const HttpLoader = ({ httpRequestInProgress, dimensions, color }) => 
  httpRequestInProgress && (
    <StyledLoader color={color} style={{ height: dimensions, width: dimensions }} />
  );

HttpLoader.propTypes = {
  dimensions: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  httpRequestInProgress: PropTypes.bool.isRequired
}

const mapStateToProps = ({ global: { httpRequestInProgress } }) => ({ httpRequestInProgress });
export default connect(mapStateToProps, null)(HttpLoader);
