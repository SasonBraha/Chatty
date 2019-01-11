import React, { Component } from 'react';
import adminOnly from '../../containers/Hoc/guestOnly';

class ManageChat extends Component {
  render() {
    return <div>Hello</div>;
  }
}

export default adminOnly(ManageChat);
