import React from 'react';
import { Table } from 'react-bootstrap';
import '../WonderEquips.css'

const SearchElement = (props) => (
    <div>
        <Table className='selector td6' bordered>
            <tbody>
                <tr>
                    <td onClick={() => props.selectSearchOption('element', 0)} style={{ 'fontWeight': props.getSelectedStyle('element', 0) }}>All</td>
                    <td onClick={() => props.selectSearchOption('element', 1)} style={{ 'fontWeight': props.getSelectedStyle('element', 1) }}>Fire</td>
                    <td onClick={() => props.selectSearchOption('element', 2)} style={{ 'fontWeight': props.getSelectedStyle('element', 2) }}>Water</td>
                    <td onClick={() => props.selectSearchOption('element', 3)} style={{ 'fontWeight': props.getSelectedStyle('element', 3) }}>Tree</td>
                    <td onClick={() => props.selectSearchOption('element', 4)} style={{ 'fontWeight': props.getSelectedStyle('element', 4) }}>Light</td>
                    <td onClick={() => props.selectSearchOption('element', 5)} style={{ 'fontWeight': props.getSelectedStyle('element', 5) }}>Darkness</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default SearchElement;