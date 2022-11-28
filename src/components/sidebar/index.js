import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Nav, Button, Box } from "grommet";
import {
    TbCircleSquare, TbListSearch, TbBrandMessenger, TbLayoutDashboard,
    TbSettings, TbLogout
} from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { AppContext } from "../../context";

export default function SideBar() {

    const { signOutAction } = React.useContext(AppContext);
    const navigate = useNavigate();

    const route = (path) => {
        navigate(path, { replace: true });
    };

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
        <Sidebar
            pad={"xsmall"}
            border={"right"}
            // background="dark-1"
            // width={"76px"}
            header={
                // <Avatar margin={{ "vertical": "medium" }} border={{ size: "small", color: "light-3" }}>
                //     { "M" }
                // </Avatar>
                // <Button margin={{ "vertical": "medium", "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator
                //     // tip={{ dropProps: { align: { left: "right" } }, content: "로그인" }}
                //         onClick={() => signOutWithGoogle()} // TODO
                // >
                //     <Box pad={"small"} direction={"row"} align={"center"} gap={"xsmall"}>
                //         <Logout/>
                //         <Text margin={{ right: "small" }}>로그아웃</Text>
                //     </Box>
                // </Button>
                <Box pad={"small"} margin={{ top: "medium" }} align={"center"}>
                    <Button icon={<TbCircleSquare size={24} color={"#ffffff"} />}
                            primary
                            className="full-rounded disabled-focus"
                            onClick={() => route("/main")}
                    />
                </Box>
            }
            footer={
                // <Button margin={{ "vertical": "medium", "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator>
                //     <Box pad="small" direction="row" align="center" gap="small">
                //         <Help/>
                //         <Text margin={{ right: "small" }}>도움말</Text>
                //     </Box>
                // </Button>
                <Box pad={{ horizontal: "small", vertical: "medium" }} gap={"small"} border={"top"} align={"center"}>
                    <Button icon={<TbSettings size={24} />}
                            className="rounded disabled-focus"
                            hoverIndicator
                    />
                    <Button icon={<TbLogout size={24} />}
                            className="rounded disabled-focus"
                            margin={{ left: "5px" }}
                            hoverIndicator
                            onClick={() => signOutWithGoogle()}
                    />
                </Box>
            }
        >
            <Nav gap="small" pad={"small"} align={"center"}>
                <Button icon={<TbListSearch size={24} />}
                        className="rounded disabled-focus"
                        hoverIndicator
                        onClick={() => route("/main")}
                />
                {/*<Button icon={<TbCloudUpload size={24} />}*/}
                {/*        className="rounded disabled-focus"*/}
                {/*        hoverIndicator*/}
                {/*        onClick={() => route("/main/manage")}*/}
                {/*/>*/}
                <Button icon={<TbLayoutDashboard size={24} />}
                        className="rounded disabled-focus"
                        hoverIndicator
                />
                <Button icon={<TbBrandMessenger size={24} />}
                        className="rounded disabled-focus"
                        hoverIndicator
                />
                {/*<Button icon={<TbPlugConnected size={24} />}*/}
                {/*        className="rounded disabled-focus"*/}
                {/*        hoverIndicator*/}
                {/*/>*/}
                {/*<Button margin={{ "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator*/}
                {/*        onClick={() => route("/main")}*/}
                {/*>*/}
                {/*    <Box pad="small" direction="row" align="center" gap="small">*/}
                {/*        <AppsRounded/>*/}
                {/*        <Text margin={{ right: "small" }}>홈</Text>*/}
                {/*    </Box>*/}
                {/*</Button>*/}
                {/*<Button margin={{ "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator*/}
                {/*        onClick={() => route("/main/search")}*/}
                {/*>*/}
                {/*    <Box pad="small" direction="row" align="center" gap="small">*/}
                {/*        <Search/>*/}
                {/*        <Text margin={{ right: "small" }}>찾아보기</Text>*/}
                {/*    </Box>*/}
                {/*</Button>*/}
                {/*<Button margin={{ "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator*/}
                {/*        onClick={() => route("/main/bookmarks")}*/}
                {/*>*/}
                {/*    <Box pad="small" direction="row" align="center" gap="small">*/}
                {/*        <Bookmark/>*/}
                {/*        <Text margin={{ right: "small" }}>즐겨찾기</Text>*/}
                {/*    </Box>*/}
                {/*</Button>*/}
                {/*<Button margin={{ "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator*/}
                {/*        onClick={() => route("/main/manage")}*/}
                {/*>*/}
                {/*    <Box pad="small" direction="row" align="center" gap="small">*/}
                {/*        <ShareRounded/>*/}
                {/*        <Text margin={{ right: "small" }}>모델 관리</Text>*/}
                {/*    </Box>*/}
                {/*</Button>*/}
                {/*<Button margin={{ "horizontal": "small" }} className="rounded disabled-focus" hoverIndicator*/}
                {/*        onClick={() => route("/main/settings")}*/}
                {/*>*/}
                {/*    <Box pad="small" direction="row" align="center" gap="small">*/}
                {/*        <Configure/>*/}
                {/*        <Text margin={{ right: "small" }}>설정</Text>*/}
                {/*    </Box>*/}
                {/*</Button>*/}
            </Nav>
        </Sidebar>
    );

}
