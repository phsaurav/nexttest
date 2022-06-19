import React from 'react';

interface OGCardProps {
title ?: string
}

const OGCard: React.FC<OGCardProps> = ({title}) => {
	return (
		<>
			<h3>{title}</h3>
		</>
	);
}

OGCard.defaultProps = {
	title: 'Tutor Chai'
}

OGCard.propTypes = {

};

export default OGCard;