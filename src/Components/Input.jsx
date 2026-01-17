import React from 'react'

const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {
 return (
    <div>
        {label && <label className="block mb-1 font-medium text-slate-100">{label}</label>}
        <input
            ref={ref}
            type={type}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
            {...props}
        />
    </div>
 )
})

export default Input