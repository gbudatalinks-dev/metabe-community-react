import React from "react";
import { Routes, Route } from "react-router-dom";

import { Box } from "grommet";

import SideBar from "../../components/sidebar";
import Home from "./home";
import Profile from "./profile";

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
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Box>
    );

}
