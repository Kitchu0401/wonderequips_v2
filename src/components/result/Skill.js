import React from 'react';
import { times } from 'lodash';
import { Panel } from 'react-bootstrap';
import { Mark } from '../index';

const headers = ['Weapon', 'Armor', 'Accessory'];
const Skill = ({ skill, index }) => (
    <Panel header={headers[index]} className="skill">
        {
            skill.map((v, i) => {
                return times(v, (_v) => (<Mark key={_v} pattern={i}/>));
            })
        }
    </Panel>
);

export default Skill;