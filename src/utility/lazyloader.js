import React, { Component, useEffect, useState } from "react";

const asyncComponent = (importComponent) => {
    return (props) => {
        const [ component, setComponent ] = useState(null);

        useEffect(async () => {
            // import child component whenever 
            // this component is called and set the component to the state
            const cmp = await importComponent();
            setComponent(cmp.default)
        }, []);
        // check if component is imported and render it, else render null
        const C = component;
        return C ? <C {...props} /> : null
    }
}

export default asyncComponent;