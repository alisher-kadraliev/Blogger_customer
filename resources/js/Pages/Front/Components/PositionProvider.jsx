// PositionContext.js
import React, { createContext, useState } from 'react';

const PositionContext = createContext();

const PositionProvider = ({ children }) => {
    const [imagePosition, setImagePosition] = useState(null);

    return (
        <PositionContext.Provider value={{ imagePosition, setImagePosition }}>
            {children}
        </PositionContext.Provider>
    );
};

export { PositionContext, PositionProvider };
