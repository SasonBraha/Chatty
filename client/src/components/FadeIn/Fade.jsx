import React from 'react';
import { Transition } from 'react-transition-group';
import './Fade.css'

const Fade = props => {
  return (
    <Transition timeout={0} in={props.in} appear>
      {mountState => (
        <div className={`fade ${mountState}`}>
          {props.children}
        </div>
      )}
    </Transition>
  );
}

export default Fade;