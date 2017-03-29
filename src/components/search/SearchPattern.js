import React from 'react';
import { Table } from 'react-bootstrap';

const SearchPattern = (props) => (
    <div>
        <Table className='selector td3' bordered>
            <tbody>
                <tr>
                    <td onClick={() => props.selectSearchOption('pattern', 0)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 0) }}>Circle</td>
                    <td onClick={() => props.selectSearchOption('pattern', 1)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 1) }}>Diamond</td>
                    <td onClick={() => props.selectSearchOption('pattern', 2)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 2) }}>Square</td>
                </tr>
                <tr>
                    <td onClick={() => props.selectSearchOption('pattern', 3)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 3) }}>Triangle</td>
                    <td onClick={() => props.selectSearchOption('pattern', 4)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 4) }}>Heart</td>
                    <td onClick={() => props.selectSearchOption('pattern', 5)} style={{ 'fontWeight': props.getSelectedStyle('pattern', 5) }}>Star</td>
                </tr>
                {props.patterns}
            </tbody>
        </Table>
    </div>
);

export default SearchPattern;