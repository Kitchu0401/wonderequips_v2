import React from 'react';
import { Image } from 'react-bootstrap';

const patterns = ['circle', 'diamond', 'square', 'triangle', 'heart', 'star_black'];
const getImgPath = (pattern) => {
    return `${process.env.PUBLIC_URL}/image/${patterns[pattern]}.png`;
};

const Mark = ({ pattern, cancleSearchPattern }) => (
    <Image src={getImgPath(pattern)} alt='Pattern' onClick={() => { cancleSearchPattern(pattern); }} />
);

export default Mark;