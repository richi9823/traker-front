
import React from 'react';
import './styles.scss'
export const Toggle = ({ label, toggled, onClick, id }) => {
    
    const callback = () => {
       onClick(!toggled, id)
    }

    return (
        <div className='toggle'>
        <label>
            <input type="checkbox" defaultChecked={toggled} checked={toggled} onClick={ callback} />
            <span />
            <strong>{label}</strong>
        </label>
        </div>
    )
}