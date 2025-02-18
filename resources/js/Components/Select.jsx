const Select = ({options, value, onChange, className, placeholder}) => {

    const transformedOptions = [
        { value: '', label: 'Select...' },
        ...options,
    ];

    return (
        <>
            <select
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                    ${className ?? 'text-sm'} `}>

                {placeholder === undefined ? '' 
                    : (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                {transformedOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;