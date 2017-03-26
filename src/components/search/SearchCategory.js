import React from 'react';
import { Table } from 'react-bootstrap';
import '../WonderEquips.css'

const SearchCategory = (props) => (
    <div>
        <Table className='selector td3' bordered>
            <tbody>
                <tr>
                    <td onClick={() => props.selectSearchOption('part', 0)} style={{ 'fontWeight': props.getSelectedStyle('part', 0) }}>Weapon</td>
                    <td onClick={() => props.selectSearchOption('part', 1)} style={{ 'fontWeight': props.getSelectedStyle('part', 1) }}>Armor</td>
                    <td onClick={() => props.selectSearchOption('part', 2)} style={{ 'fontWeight': props.getSelectedStyle('part', 2) }}>Accessory</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default SearchCategory;

// export default class SearchCategory extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// 
//     handleOnclick = (keyword) => {
//         console.log('hayo: ', keyword);
//     }
//     
//     render() {
//         return (
//             <div>
//                 <Table className='selector td3' bordered>
//                     <tbody>
//                         <tr>
//                             <td onClick={() => this.handleOnclick('test')}>Weapon</td>
//                             <td>Armor</td>
//                             <td>Accessory</td>
//                         </tr>
//                     </tbody>
//                 </Table>
//             </div>
//         )
//     }
// };