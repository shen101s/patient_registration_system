import { useState } from 'react';

const FlashMessage = ({ message, type = 'success' }) => {
    const [visible, setVisible] = useState(true);

    if (!message || !visible) return null;

    const colors = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
    };

    return (
        <div className={`${colors[type]} p-4 rounded-md mb-4 flex justify-between items-center`}>
            <span>{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="text-lg font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};

export default FlashMessage;
