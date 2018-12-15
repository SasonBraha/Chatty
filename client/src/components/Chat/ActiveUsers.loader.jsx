import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from  'styled-components';

const ActiveUsersLoader = () => (
  <StyledLoaderContainer>
    <ContentLoader 
      height={36}
      width={36}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#2F353C"
    >
      <circle cx="18.110999999999997" cy="17.691" r="15.110999999999999" />
    </ContentLoader>
  </StyledLoaderContainer>
);

const StyledLoaderContainer = styled.div`
  height: 3.6rem;
  width: 3.6rem;
  margin-bottom: .3rem;
`;

export default ActiveUsersLoader;
