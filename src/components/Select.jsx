import React from 'react'

function Select({ id, name, value, onChange, error, label, options, defaultOption }) {
    return (
        <div className="input-container" >
            <label htmlFor={label}>{label}</label>
            <select id={id} name={name} value={value} onChange={onChange}>
                <option hidden>{defaultOption}</option>
                {
                    options.map((option,i) => {
                        return <option key={i} value={option}>{option}</option>
                    })
                }
            </select>
            <p className='error'>{error}</p>
        </div>

    )
}

export default Select