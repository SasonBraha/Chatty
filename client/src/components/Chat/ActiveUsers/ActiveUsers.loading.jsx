import React from 'react';
import ContentLoader from "react-content-loader"

const ActiveUsersLoader = props => (
  <div style={{ height: '3.6rem', width: '3.6rem', display: 'block', marginBottom: '.3rem' }}>
    <ContentLoader 
      height={36}
      width={36}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#2F353C"
      {...props}
    >
      <circle cx="18.110999999999997" cy="17.691" r="15.110999999999999" />
    </ContentLoader>
  </div>
);

export default ActiveUsersLoader;
