import styled from 'styled-components';

export const StyledRow = styled.div`
  margin-bottom: 2rem;
`;

export const StyledSelect = styled.select`
  display: block;
  width: ${({ width }) => width ? width : '100%'};
  border-color: #d4d4d4;
  border-radius: .3rem;
  padding: 1rem;
  cursor: pointer;
`;