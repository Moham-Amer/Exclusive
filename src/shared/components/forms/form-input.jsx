import { useState } from 'react';
import './style.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function FormInput({ errorMessage, type = 'text',...inputProps }) {
    const [isPasswordInput, setIsPasswordInput] = useState(type === 'password');

    return (
        <div className='form-container-control'>
            <input
                className="form-container-title"
                type={isPasswordInput ? 'password' : type === 'password' ? 'text' : type}
                {...inputProps}
            />
            {type === 'password' ? <i className="form-container-type-icon" onClick={() => setIsPasswordInput(prev => !prev)}>{isPasswordInput ? <Visibility /> : <VisibilityOff />}</i> : null}
            {Boolean(errorMessage) && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}