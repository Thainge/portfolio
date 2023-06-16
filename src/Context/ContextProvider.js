import React, { useContext, useRef } from 'react';

const Context = React.createContext();

export function ContextFunction() {
    return useContext(Context)
}

export function InputProvider({ children }) {
    const AboutRef = useRef();
    const PortfolioRef = useRef();
    const ContactRef = useRef();

    let obj = {
        AboutRef,
        PortfolioRef,
        ContactRef
    }

    return (
        <Context.Provider value={obj}>
            {children}
        </Context.Provider>
    )
}