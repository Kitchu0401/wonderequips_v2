import React from 'react';
// import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Skill from './Skill';

// export default class SkillList extends Component {
//     // resultListMarkups = () => {
//     //     return this.props.resultList.length <= 0
//     //         ? <ListGroupItem header="no search result." />
//     //         : this.props.resultList.map((result, i) => <Result result={result} key={i}/>);
//     // }
// 
//     render() {
//         return (
//             <ListGroup>
//                 {
//                     
//                 }
//             </ListGroup>
//         );
//     }
// }

const SkillList = ({ skillList }) => (
    <div>
        {
            skillList.map((skill, index) => (
                <Skill key={index} skill={skill} index={index} />
            ))
        }
    </div>
);

export default SkillList;