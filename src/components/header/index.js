import React from "react";
import { useNavigate } from "react-router-dom";

import { Anchor, Avatar, Box, Button, Header, Layer, Text, TextInput } from "grommet";
import {
    TbApps, TbBell, TbLogout, TbMailForward, TbQuestionMark, TbSearch, TbSettings, TbMoodEmpty
} from "react-icons/tb";

import { signOut } from "firebase/auth";
import { AppContext } from "../../context";
import { auth } from "../../config/firebase";
import UploadApp from "../upload";

export default function PageHeader() {

    const navigate = useNavigate();
    const { globalState, signOutAction } = React.useContext(AppContext);

    const [ contextMenuOpen, setContextMenuOpen ] = React.useState(false);
    const [ notificationListOpen, setNotificationListOpen ] = React.useState(false);

    const [ createAppOpen, setCreateAppOpen ] = React.useState(false);

    const onContextMenuOpen = () => setContextMenuOpen(true);
    const onContextMenuClose = () => setContextMenuOpen(false);

    const onNotificationListOpen = () => setNotificationListOpen(true);
    const onNotificationListClose = () => setNotificationListOpen(false);

    const onCreateAppOpen = () => setCreateAppOpen(true);
    const onCreateAppClose = () => setCreateAppOpen(false);

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            sessionStorage.clear();
            signOutAction();
            navigate("/");
        }).catch((error) => {
            // An error happened.
            console.log("[SignOut Error]", error);
        });
    };

    return (
        <>
            { contextMenuOpen &&
                <Layer animation={"slide"} position={"top-right"} margin={{ top: "85px", right: "24px" }} background={"#282828"}
                       style={{ borderRadius: 16 }}
                       onClickOutside={onContextMenuClose} onEsc={onContextMenuClose}
                       modal
                       responsive
                >
                    <Box pad={{ vertical: "small" }} gap={"small"}>
                        <Box gap={"small"} align={"center"} direction={"row"} pad={{ horizontal: "medium" }} margin={{ right: "small" }}>
                            <Avatar src={globalState.user.photoURL} size={"32px"} style={{ border: "solid 2px #ff5a01"}} />
                            <Box gap={"xsmall"}>
                                <Text size={"small"}>
                                    { globalState.user.name }
                                </Text>
                                <Anchor color={"brand"} size={"small"} onClick={() => navigate("/main/profile")}>
                                    계정 관리
                                </Anchor>
                            </Box>
                        </Box>
                        <div className={"divider"}/>
                        <Box gap={"small"} pad={{ horizontal: "medium" }}>
                            <Box gap={"medium"} align={"center"} direction={"row"} className="disabled-focus"
                                 onClick={() => {
                                     onContextMenuClose();
                                     onCreateAppOpen();
                                 }}
                            >
                                <TbApps />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    내 앱 등록
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} className="disabled-focus"
                                 onClick={() => {}}
                            >
                                <TbSettings />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    설정
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} className="disabled-focus"
                                 onClick={() => signOutWithGoogle()}
                            >
                                <TbLogout style={{ marginLeft: 2, marginRight: -2 }} />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    로그아웃
                                </Text>
                            </Box>
                        </Box>
                        <div className={"divider"}/>
                        <Box gap={"small"} pad={{ horizontal: "medium" }}>
                            <Box gap={"medium"} align={"center"} direction={"row"} className="disabled-focus"
                                 onClick={() => {}}
                            >
                                <TbQuestionMark />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    고객 센터
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} className="disabled-focus"
                                 onClick={() => {}}
                            >
                                <TbMailForward />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    의견 보내기
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Layer>
            }
            { notificationListOpen &&
                <Layer animation={"slide"} position={"top-right"} margin={{ top: "85px", right: "24px" }} background={"#282828"}
                       style={{ borderRadius: 16 }}
                       onClickOutside={onNotificationListClose} onEsc={onNotificationListClose}
                       modal
                       responsive
                >
                    <Box pad={{ vertical: "small", horizontal: "medium" }}>
                        <Box direction={"row"} gap={"xsmall"} align={"center"} margin={{ top: "1px" }}>
                            <TbMoodEmpty color={"#cccccc"} />
                            <Text size={"small"} color={"text-weak"} margin={{ top: "1px" }}>
                                알림이 없습니다.
                            </Text>
                        </Box>
                    </Box>
                </Layer>
            }
            { createAppOpen &&
                <Layer position={"center"} background={"background-back"}
                       style={{ borderRadius: 16 }}
                       onClickOutside={onCreateAppClose} onEsc={onCreateAppClose}
                       modal
                       responsive
                >
                    <UploadApp onClose={onCreateAppClose} />
                </Layer>
            }
            <Header pad={{ horizontal: "medium", top: "medium", bottom: "small" }} direction={"column"}>
                <Box gap={"xlarge"} pad={{ top: "small" }} direction={"row"} width={"100%"}>
                    <Box flex={true}>
                        <TextInput icon={<TbSearch color={"#cccccc"} style={{ marginLeft: 6 }} />} size={"small"}
                                   placeholder={"검색"}
                        />
                    </Box>
                    <Box gap={"small"} align={"center"} direction={"row"}>
                        <Text size={"small"} margin={{ top: "2px" }}>
                            { globalState.user.name }
                        </Text>
                        <Avatar src={globalState.user.photoURL} size={"32px"} style={{ border: "solid 2px #ff5a01"}}
                                onClick={onContextMenuOpen}
                        />
                        <Button icon={<TbBell size={18} />}
                                className="full-rounded disabled-focus"
                                style={{ padding: 10, marginLeft: -4, marginTop: 1 }}
                                hoverIndicator
                                onClick={onNotificationListOpen}
                        />
                    </Box>
                </Box>
            </Header>
        </>
    );

}
