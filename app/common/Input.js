import React from 'react';

const Input = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    className = '',
    error,
}) => {
    return (
        <div className='mb-3  '>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`px-3 w-full py-[1.5rem] placeholder-black outline-none border rounded-[1.375rem] ${className}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Input;
