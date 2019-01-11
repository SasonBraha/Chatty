import React from 'react';
import PropTypes from 'prop-types';

const List = ({ color, children }) => <ul style={{ color }}>{children}</ul>;

List.defaultProps = {
  color: 'white',
};

List.propTypes = {
  color: PropTypes.string,
};

export default List;
