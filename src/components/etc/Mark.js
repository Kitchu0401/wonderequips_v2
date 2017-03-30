import React from 'react';
import { Image } from 'react-bootstrap';

const patterns = ['circle', 'diamond', 'square', 'triangle', 'heart', 'start_white'];
const getImgSrc = (pattern) => {
    return `/image/${patterns[pattern]}.png`;
}

const Mark = ({ pattern }) => (
    <Image src={getImgSrc(pattern)} />
);

export default Mark;