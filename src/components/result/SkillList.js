import React from 'react';
import Skill from './Skill';

const SkillList = ({ skillList }) => (
    <div className="align-center">
        {
            skillList.map((skill, index) => (
                <Skill key={index} skill={skill} index={index} />
            ))
        }
    </div>
);

export default SkillList;