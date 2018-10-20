import React from 'react';
import ContentLoader from "react-content-loader"

export default props => {
	const positionOptions = ['right', 'left'];
	return (
		<div style={{ display: 'block', height: '7.5rem', marginBottom: '1rem' }}>
			<ContentLoader
				height={76}
				width={250}
				speed={2}
				primaryColor="#f3f3f3"
				secondaryColor="#0079ea"
				style={{ width: '25rem', float: positionOptions[Math.floor(Math.random() * positionOptions.length)] }}
				{...props}
			/>
		</div>
	);
} 
