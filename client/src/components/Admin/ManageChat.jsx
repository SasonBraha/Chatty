import React, { Component } from 'react'
import adminOnly from '../Hoc/adminOnly';

class ManageChat extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

export default adminOnly(ManageChat);
