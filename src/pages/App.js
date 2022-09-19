import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import classnames from "classnames";
import { Grommet, Box } from "grommet";

import { DEFAULT_THEME } from "../config/theme";
import { AppContext, Action, DEFAULT_STATE } from "../context";

import SignIn from "./auth";
import Main from "./main";

export default function App() {

    const reducer = (state, action) => { //state 변화 정의
        switch (action.type) {
            case Action.SIGN_IN:
                return {
                    ...state,
                    user: action.data,
                    isSignIn: true,
                };
            case Action.SIGN_OUT:
                return {
                    ...state,
                    user: undefined,
                    isSignIn:false,
                };
            default:
                break;
        }
    };

    const [ globalState, dispatch ] = React.useReducer(reducer, DEFAULT_STATE);

    const contextValue = React.useMemo(
        () => ({
            globalState: globalState,
            signInAction: (user) => {
                dispatch({ type: Action.SIGN_IN, data: user });
            },
            signOutAction: () => {
                dispatch({ type: Action.SIGN_OUT, data: undefined });
            },
        }),
        [globalState]
    );

    return (
        <div className={classnames("app-content")}>
            <Grommet theme={DEFAULT_THEME} themeMode={"light"} full>
                <HashRouter>
                    <AppContext.Provider value={contextValue}>
                        <Box
                            direction="row"
                            pad="none"
                            fill={true}
                        >
                            <Routes>
                                <Route path="/main/*" element={<Main />} />
                                <Route path="/" element={<SignIn />} />
                                <Route path="*" element={<SignIn />} />
                            </Routes>
                        </Box>
                    </AppContext.Provider>
                </HashRouter>
            </Grommet>
        </div>
    );

}
