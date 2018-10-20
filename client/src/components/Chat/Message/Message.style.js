import styled, { css } from 'styled-components';
import { shadowColor } from '../../Ui/theme/variables';
import media from '../../utils/media';

export const StyledMessageContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const StyledMessage = styled.div`
  padding: .5rem 1rem;
  float: left;
  border-radius: .5rem;
  min-width: 25rem;
  max-width: 50rem;
  box-shadow: 0 0 .5rem ${shadowColor};
  background: white;
  color: black;
  word-break: break-word;
  position: relative;

  ${media.phone`
    max-width: 10rem;
  `};

  ${({ isMine }) => isMine && css`
    float: right;
    background: #0079ea;
    color: white;
  `}

  .Linkify a {
    text-decoration: underline;
    color: inherit;
  }

  &:after {
    /* content: "";
    position: absolute;
    left: 1.5em;
    bottom: -1em;
    height: 0;
    width: 0;
    border-top: 40px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 82px solid #fff;
    transform: rotate(-33deg); */
  }
`;
 
export const StyledMetaData = styled.small`
  font-size: 1.34rem;
  color: #a9a9a9;
  display: block;

  ${({ alignLeft }) => alignLeft && css`
    text-align: left;
  `}
`;

export const StyledBody = styled.div`
  padding: .4rem 0;
`;