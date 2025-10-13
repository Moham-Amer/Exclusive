import { useState } from 'react';
import './style.css';

export function FormInput({ errorMessage, type = 'text',...inputProps }) {
    const [isPasswordInput, setIsPasswordInput] = useState(type === 'password');

    return (
        <div className='form-container-control'>
            <input
                className="form-container-title"
                type={isPasswordInput ? 'password' : type === 'password' ? 'text' : type}
                {...inputProps}
            />
            {type === 'password' ? <i className="form-container-type-icon" onClick={() => setIsPasswordInput(prev => !prev)}>{isPasswordInput ? 'show' : 'hide'}</i> : null}
            {Boolean(errorMessage) && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}