import styled, { css } from 'styled-components';
import { err } from '../../../resources/themeVariables';

export const StyledInputRow = styled.div`
  margin-bottom: 2rem;

  ${({ isInvalid }) => isInvalid && css`
    color: ${err};
    font-size: 1.3rem;
    text-align: right;
  `}
`;

export const StyledInputContainer = styled.div`
  position: relative;
  
  .label {
    position: absolute;
    right: .1rem;
    top: 1.3rem;
    cursor: text;
    transition: .3s;
  }

  .icon {
    position: absolute;
    left: .5rem;
    top: 1.5rem;
  }
`;

export const StyledInput = styled.input`
  &[type="text"], &[type="email"], &[type="password"] {
    display: block;
    border: none;
    padding: 1rem 0 1rem 3rem;
    width: 100%;
    outline: none;
    border-bottom: .1rem solid lightgray;

    &:focus, &:valid {
      & ~ label {
        transform-origin: top right;
        transition: .3s;
        transform: translateY(-2.3rem) scale(.85);
      }
    }
  }
`;