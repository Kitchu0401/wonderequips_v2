import React from 'react';
import { times } from 'lodash';
import { Panel } from 'react-bootstrap';
import { Mark } from '../index';

const headers = ['Weapon', 'Armor', 'Accessory'];
const getSkillMarkups = (skill, index) => {
    if ( skill === null ) { return <span key={index}>-</span> }
    return skill.map((v, i) => {
        return times(v, (_v) => ( <Mark key={_v} pattern={i}/> ));
    });
}

const Skill = ({ skill, index }) => (
    <Panel header={headers[index]} className="skill">
        { getSkillMarkups(skill, index) }
    </Panel>
);

export default Skill;