import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import SkillList from './SkillList';

const Result = (props) => (
    <ListGroupItem>
        <h3>{props.result.name}</h3>
        <div>
            <SkillList skillList={props.result.skill} />
        </div>
    </ListGroupItem>
);

export default Result;