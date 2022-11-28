import React from "react";

export const DEFAULT_STATE = {
    user: undefined,
};

export const AppContext = React.createContext(DEFAULT_STATE);

export const Action = {
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
};
