import React from 'react';
// import { times } from 'lodash';
import { Panel } from 'react-bootstrap';

// export default class Result extends = (props) => (
//     <div>
//         {
//             props.result.skill.map
//         }
//     </div>
//     <ListGroupItem>
//         {
//             props.result.skill.map((req, i) => (
//                 <div className="panel skill" key={i}>
//                     {
//                         req.map((v, i) => {
//                             return times(v, (_i) => ( <span key={_i}>{i}</span> ))
//                         })
//                     }
//                 </div>
//             ))
//         }
//     </ListGroupItem>
// );
// 
// export default Result;
const headers = ['Weapon', 'Armor', 'Accessory'];

const Skill = ({ skill, index }) => (
    <Panel header={headers[index]} className="skill">
        {
            skill.map((v, i) => (
                <span key={i}>{v}({i})</span>
            ))
        }
    </Panel>
);

export default Skill;