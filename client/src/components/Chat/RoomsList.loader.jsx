import React from 'react';
import ContentLoader from "react-content-loader"

export default props => 
	<ContentLoader
		height={55}
		width={250}
		speed={2}
		primaryColor="#dddddd"
		secondaryColor="#2F353C"
    {...props}
	>
		<rect x="52" y="34" rx="4" ry="4" width="117" height="6.4" /> 
		<rect x="83" y="17" rx="3" ry="3" width="85" height="6.4" /> 
		<rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" /> 
		<rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" /> 
		<rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" /> 
		<circle cx="212.4" cy="28.03" r="23.400000000000002" />
	</ContentLoader>