import React from 'react';
import { Table } from 'react-bootstrap';
import '../WonderEquips.css'

const SearchPattern = () => (
    <div>
        <Table className='selector td3' bordered>
            <tbody>
                <tr>
                    <td>Circle</td>
                    <td>Diamond</td>
                    <td>Square</td>
                </tr>
                <tr>
                    <td>Triangle</td>
                    <td>Heart</td>
                    <td>Star</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default SearchPattern;