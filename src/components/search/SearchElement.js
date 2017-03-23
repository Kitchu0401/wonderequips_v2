import React from 'react';
import { Table } from 'react-bootstrap';
import '../WonderEquips.css'

const SearchElement = () => (
    <div>
        <Table className='selector td6' bordered>
            <tbody>
                <tr>
                    <td>All</td>
                    <td>Fire</td>
                    <td>Water</td>
                    <td>Tree</td>
                    <td>Light</td>
                    <td>Darkness</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default SearchElement;