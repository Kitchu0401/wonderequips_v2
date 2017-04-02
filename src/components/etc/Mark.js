import React from 'react';
import { Image } from 'react-bootstrap';

const patterns = ['circle', 'diamond', 'square', 'triangle', 'heart', 'start_white'];
const getImgPath = (pattern) => {
    return `${process.env.PUBLIC_URL}/image/${patterns[pattern]}.png`;
};

const Mark = ({ pattern }) => (
    <Image src={getImgPath(pattern)} />
);

export default Mark;