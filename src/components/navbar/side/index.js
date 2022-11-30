import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Nav, Button, Box } from "grommet";
import {
    TbCircleSquare, TbListSearch, TbBrandMessenger, TbLayoutDashboard,
    TbBook, TbLogout
} from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { AppContext } from "../../../context";

export default function SideBar() {

    const { signOutAction } = React.useContext(AppContext);
    const navigate = useNavigate();

    const [ current, setCurrent ] = React.useState("/main/home");

    const route = (path) => {
        setCurrent(path);
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
            header={
                <Box pad={"xsmall"} margin={{ top: "medium" }} align={"center"}>
                    <Button icon={<TbCircleSquare size={24} color={"#ffffff"} />}
                            className="full-rounded disabled-focus"
                            primary
                            onClick={() => route("/main")}
                    />
                </Box>
            }
            footer={
                <Box pad={{ horizontal: "small", vertical: "medium" }} gap={"small"} border={"top"} align={"center"}>
                    <Button icon={<TbBook size={24} />}
                            hoverIndicator
                            onClick={() => route("/main/guide")}
                    />
                    <Button icon={<TbLogout size={24} />}
                            margin={{ left: "5px" }}
                            hoverIndicator
                            onClick={() => signOutWithGoogle()}
                    />
                </Box>
            }
        >
            <Nav gap="small" pad={"small"} align={"center"}>
                <Button icon={<TbListSearch size={24} color={"#eeeeee"} />}
                        primary={current === "/main/home"}
                        onClick={() => route("/main/home")}
                />
                <Button icon={<TbLayoutDashboard size={24} color={"#eeeeee"} />}
                        primary={current === "/main/collections"}
                        onClick={() => route("/main/collections")}
                />
                <Button icon={<TbBrandMessenger size={24} color={"#eeeeee"} />}
                        primary={current === "/main/chats"}
                        onClick={() => route("/main/chats")}
                />
            </Nav>
        </Sidebar>
    );

}
