import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Box } from "grommet";

import SideBar from "../../components/sidebar";
import Home from "./home";
import Profile from "./profile";
import Collections from "./collections";
import Chats from "./chats";
import Guide from "./guide";

export default function Main(props) {

    return (
        <Box
            direction="row"
            pad="none"
            fill={true}
        >
            <SideBar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
        </Box>
    );

}
