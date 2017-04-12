import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import { times } from 'lodash';
import SkillList from './SkillList';

const ELEMENTS  = ['불', '물', '나무', '빛', '어둠'];
const TYPES     = ['공격형', '방어형', '지원형'];

const Result = ({ result }) => (
    <ListGroupItem className="result">
        <div className="header">
            <span className="name"><strong>{result.name}</strong></span>
            <span className="grade">
                {
                    times(result.grade, (_v) => ( <img key={_v} src={`${process.env.PUBLIC_URL}/image/star_white.png`} alt="Rank" /> ))
                }
            </span>
            <span className="type">{ELEMENTS[result.element]}</span>
            <span className="type">{TYPES[result.type]}</span>
            {result.watched ? <Glyphicon glyph="ok" style={{ color: 'green' }}/> : undefined}
        </div>
        <div>
            <SkillList skillList={result.skill} />
        </div>
    </ListGroupItem>
);

export default Result;