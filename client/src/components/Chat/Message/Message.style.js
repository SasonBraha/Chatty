import styled, { css } from 'styled-components';
import media from '../../../utils/media';

export const StyledMessageContainer = styled.div`
  margin-bottom: 1.5rem;
  overflow: auto;
`;

export const StyledMessage = styled.div`
  padding: .5rem 1rem;
  float: left;
  border-radius: .5rem;
  min-width: 25rem;
  max-width: 50rem;
  max-height: 40rem;
  box-shadow: 0 0 .5rem var(--shadow);
  background: white;
  color: black;
  word-break: break-word;
  position: relative;

  ${media.phone`
    max-width: 10rem;
  `};

  ${({ isMine }) => isMine && css`
    float: right;
    background: var(--own-message);
    color: white;
  `}

  .Linkify a {
    text-decoration: underline;
    color: inherit;
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

export const StyledMessageBody = styled.div`
  padding: .4rem 0;
`;

export const StyledFigure = styled.figure`
  max-height: 32rem;
`;

export const StyledImage = styled.img`
  max-height: 32rem;
  max-width: 100%;
  border-radius: .35rem;
  border: .1rem solid #eee;
`;