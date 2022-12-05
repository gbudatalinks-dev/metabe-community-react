import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Box, Layer } from "grommet";

import SideBar from "../../components/navbar/side";
import BottomBar from "../../components/navbar/bottom";
import PageHeader from "../../components/header";
import AppLayer from "../../components/layer/app";
import ProfileLayer from "../../components/layer/profile";

import Home from "./home";
import Profile from "./profile";
import Collections from "./collections";
import Awards from "./awards";
import Chats from "./chats";
import Guide from "./guide";

import { useWindowSize } from "../../utils/window";

import { USERS, getItems } from "../../temp/data";

export default function Main(props) {

    const [ width, height ] = useWindowSize();
    const isLandscape = width > height;

    const gutter = 20;
    const margin = (isLandscape ? 122 : 48);
    const cols = (width > 1200 ? 5 : (width > 900 ? 4 : (width > 640 ? 3 : (width > 480 ? 2 : 1))));
    const cardWidth = (width - margin - gutter * cols) / cols;
    const modelCardWidth = (1330 - gutter * cols) / cols;

    const [ searchStrings, setSearchStrings ] = React.useState([]);

    const [ apps, setApps ] = React.useState([]);
    const [ collections, setCollections ] = React.useState([]);
    const [ users, setUsers ] = React.useState([]);

    const [ myApps, setMyApps ] = React.useState([]);
    const [ bookmarks, setBookmarks ] = React.useState([]);
    const [ subscriptions, setSubscriptions ] = React.useState([]);

    const [ selectedApp, setSelectedApp ] = React.useState(undefined);
    const [ selectedUser, setSelectedUser ]= React.useState(undefined);

    const openAppLayer = (target, uid) => {
        let items = [];
        switch (target) {
            case "apps":
                items = apps;
                break;
            case "collections":
                items = collections;
                break;
            case "myApps":
                items = myApps;
                break;
            case "bookmarks":
                items = bookmarks;
                break;
            default:
                break;
        }
        const filteredApps = items.filter(i => i.uid === uid);
        if (filteredApps.length > 0) {
            setSelectedApp(filteredApps[0]);
        }
    };
    const closeAppLayer = () => setSelectedApp(undefined);

    const openProfileLayer = (uid) => {
        const filteredUsers = USERS.filter(u => u.uid === uid);
        setSelectedUser(filteredUsers[0]);
    }
    const closeProfileLayer = () => setSelectedUser(undefined);

    React.useEffect(() => {
        setApps(getItems(0, 30, false));
        setCollections(getItems(1, 30, false));
        setUsers(USERS);
        setSearchStrings(["검색 스트링"]);
        setMyApps(getItems(2, 10, true));
        setBookmarks(getItems(3, 10, false));
        setSubscriptions(USERS);
    }, []);

    const removeSearchString = () => {
        console.log("remove search string");
    };

    const loadMoreApps = () => {
        console.log("load more apps");
    };

    const loadMoreCollections = () => {
        console.log("load more collections");
    };

    return (
        <Box
            direction="row"
            pad="none"
            fill={true}
        >
            { selectedApp !== undefined &&
                <Layer position={"center"} background={"background-back"}
                       style={{ borderRadius: 24 }}
                       onClickOutside={closeAppLayer} onEsc={closeAppLayer}
                       modal
                       responsive
                >
                    <AppLayer item={selectedApp} onClose={closeAppLayer} />
                </Layer>
            }
            { selectedUser !== undefined &&
                <Layer position={"center"} background={"background-back"}
                       style={{ borderRadius: 24 }}
                       onClickOutside={closeProfileLayer} onEsc={closeProfileLayer}
                       modal
                       responsive
                >
                    <ProfileLayer cardWidth={modelCardWidth} user={selectedUser} isSubscribed={false} onClose={closeProfileLayer} />
                </Layer>
            }
            { isLandscape && <SideBar /> }
            <Box fill>
                <PageHeader />
                <Routes>
                    <Route index element={
                        <Home searchStrings={searchStrings}
                              items={apps}
                              cardWidth={cardWidth}
                              isLandscape={isLandscape}
                              onRemoveSearch={removeSearchString}
                              onLoadMore={loadMoreApps}
                              onAppClick={openAppLayer}
                              onUserClick={openProfileLayer}
                        />
                    } />
                    <Route path="/awards" element={<Awards />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/collections" element={
                        <Collections searchStrings={searchStrings}
                                     items={collections}
                                     cardWidth={cardWidth}
                                     isLandscape={isLandscape}
                                     onRemoveSearch={removeSearchString}
                                     onLoadMore={loadMoreCollections}
                                     onAppClick={openAppLayer}
                                     onUserClick={openProfileLayer}
                        />
                    } />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/home" element={
                        <Home searchStrings={searchStrings}
                              items={apps}
                              cardWidth={cardWidth}
                              isLandscape={isLandscape}
                              onRemoveSearch={removeSearchString}
                              onLoadMore={loadMoreApps}
                              onAppClick={openAppLayer}
                              onUserClick={openProfileLayer}
                        />
                    } />
                    <Route path="/profile" element={
                        <Profile cardWidth={cardWidth}
                                 isLandscape={isLandscape}
                                 myApps={myApps}
                                 bookmarks={bookmarks}
                                 subscriptions={subscriptions}
                                 onAppClick={openAppLayer}
                                 onUserClick={openProfileLayer}
                        />
                    } />
                    <Route path="*" element={<Navigate to="/error" replace />} />
                </Routes>
            </Box>
            { !isLandscape && <BottomBar /> }
        </Box>
    );

}
