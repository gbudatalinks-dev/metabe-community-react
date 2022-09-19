import React from "react";
import { Routes, Route } from "react-router-dom";

import { Box } from "grommet";

import SideBar from "../../components/sidebar";
import Home from "./home";
import Search from "./search";
import Bookmarks from "./bookmarks";
import Manage from "./manage";
import Settings from "./settings";
import Models from "./models";

export default function Main(props) {

    return (
        <Box
            direction="row"
            pad="none"
            fill={true}
        >
            <SideBar />
            <Routes>
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/models/:modelId" element={<Models />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Box>
    );

}
