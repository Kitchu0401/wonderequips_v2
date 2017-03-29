import React from 'react';
import { times } from 'lodash';
import { ListGroupItem } from 'react-bootstrap';

// export default class Result extends React.Component {
//     render() {
//         const { result } = this.props;
//         return (
//             <ListGroupItem>
//                 <h3>{result.name}</h3>
//                 <div>
//                     {
//                         result.skill.map((req, i) => (
//                             <div className="panel skill" key={i}>
//                                 {
//                                     req.map((v, i) => {
//                                         return times(v, (_i) => ( <span key={_i}>{i}</span> ))
//                                     })
//                                 }
//                             </div>
//                         ))
//                     }
//                 </div>
//             </ListGroupItem>
//         )
//     }
// }

const Result = (props) => (
    <ListGroupItem>
        <h3>{props.result.name}</h3>
        <div>
            {
                props.result.skill.map((req, i) => (
                    <div className="panel skill" key={i}>
                        {
                            req.map((v, i) => {
                                return times(v, (_i) => ( <span key={_i}>{i}</span> ))
                            })
                        }
                    </div>
                ))
            }
        </div>
    </ListGroupItem>
);

export default Result;