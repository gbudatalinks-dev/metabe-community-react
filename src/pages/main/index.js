import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Box } from "grommet";

import SideBar from "../../components/navbar/side";
import BottomBar from "../../components/navbar/bottom";
import Home from "./home";
import Profile from "./profile";
import Collections from "./collections";
import Chats from "./chats";
import Guide from "./guide";

import { useWindowSize } from "../../utils/window";

export default function Main(props) {

    const [ width, height ] = useWindowSize();
    const isLandscape = width > height;

    return (
        <Box
            direction="row"
            pad="none"
            fill={true}
        >
            { isLandscape && <SideBar /> }
            <Routes>
                <Route index element={<Home />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
            { !isLandscape && <BottomBar /> }
        </Box>
    );

}
