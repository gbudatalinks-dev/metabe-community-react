import React from "react";

export const useWindowSize = () => {
    const [ size, setSize ] = React.useState([0, 0]);

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([document.documentElement.clientWidth, document.documentElement.clientHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};
