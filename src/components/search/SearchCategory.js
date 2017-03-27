import React from 'react';
import { Table } from 'react-bootstrap';

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