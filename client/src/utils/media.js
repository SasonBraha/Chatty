import { css } from 'styled-components';

const sizes = {
  phone: 768,
  tablet: 992,
  giant: 1376
}

const media = Object.keys(sizes).reduce((acc, size) => {
  acc[size] = (...args) => css`
    @media (max-width: ${sizes[size]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default media;