import { GetServerSideProps } from 'next';
import React from 'react';
import OGCard from '../components/OGCard';

interface ImageProps {
title: string
}

const Image: React.FC<ImageProps> = ({title}) => {
	return (
		<>
			<OGCard title={title} />
		</>
	);
}

Image.defaultProps={};

export const getServerSideProps: GetServerSideProps =async ({query}) => {
	const {title} = query;

	return{
		props:{
			isStandAlone: true,
			...(title && {title})
		}
	}
}

export default Image;