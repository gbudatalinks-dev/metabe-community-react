import React from "react";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Grommet, Box } from "grommet";

import { DEFAULT_THEME } from "../config/theme";
import { AppContext, Action, DEFAULT_STATE } from "../context";

import SignIn from "./auth";
import Main from "./main";
import ErrorPage from "./error";

export default function App() {

    const reducer = (state, action) => { //state 변화 정의
        switch (action.type) {
            case Action.SIGN_IN:
                return {
                    ...state,
                    user: action.data,
                };
            case Action.SIGN_OUT:
                return {
                    ...state,
                    user: undefined,
                };
            default:
                break;
        }
    };

    const getInitialState = () => {
        const initialState = sessionStorage.getItem("metabeUserData");
        return initialState !== null ? {
            user: JSON.parse(initialState),
        } : DEFAULT_STATE;
    };

    const [ globalState, dispatch ] = React.useReducer(reducer, getInitialState());

    const contextValue = React.useMemo(
        () => ({
            globalState: globalState,
            signInAction: (user) => {
                sessionStorage.setItem("metabeUserData", JSON.stringify(user));
                dispatch({ type: Action.SIGN_IN, data: user });
            },
            signOutAction: () => {
                sessionStorage.setItem("metabeUserData", null);
                dispatch({ type: Action.SIGN_OUT, data: undefined });
            },
        }),
        [globalState]
    );

    const ProtectedRoute = ({ user, children }) => {
        const location = useLocation();
        if (!user) {
            return <Navigate to="/auth" state={{ from: location }} replace />;
        }

        return children;
    };

    return (
        <HashRouter>
            <AppContext.Provider value={contextValue}>
                <Grommet theme={DEFAULT_THEME} themeMode={"dark"} full>
                    <Box
                        direction="row"
                        pad="none"
                        fill={true}
                    >
                        <Routes>
                            <Route index element={
                                <ProtectedRoute user={globalState.user}>
                                    <Main />
                                </ProtectedRoute>
                            } />
                            <Route path="/auth" element={<SignIn />} />
                            <Route path="/main/*" element={
                                <ProtectedRoute user={globalState.user}>
                                    <Main />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Box>
                </Grommet>
            </AppContext.Provider>
        </HashRouter>
    );

}
