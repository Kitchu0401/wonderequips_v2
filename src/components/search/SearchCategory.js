import React from 'react';
import { Table } from 'react-bootstrap';
import '../WonderEquips.css'

const SearchCategory = () => (
    <div>
        <Table className='selector td3' bordered>
            <tbody>
                <tr>
                    <td>Weapon</td>
                    <td>Armor</td>
                    <td>Accessory</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default SearchCategory;