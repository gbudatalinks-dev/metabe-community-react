import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Nav, Button, Box } from "grommet";
import {
    TbCircleSquare, TbListSearch, TbBrandMessenger, TbLayoutDashboard,
    TbBook, TbLogout
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
            header={
                <Box pad={"xsmall"} margin={{ top: "medium" }} align={"center"}>
                    <Button icon={<TbCircleSquare size={20} color={"#ffffff"} />}
                            primary
                            className="full-rounded disabled-focus"
                            onClick={() => route("/main")}
                    />
                </Box>
            }
            footer={
                <Box pad={{ horizontal: "small", vertical: "medium" }} gap={"small"} border={"top"} align={"center"}>
                    <Button icon={<TbBook size={24} />}
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
                <Button icon={<TbLayoutDashboard size={24} />}
                        className="rounded disabled-focus"
                        hoverIndicator
                />
                <Button icon={<TbBrandMessenger size={24} />}
                        className="rounded disabled-focus"
                        hoverIndicator
                />
            </Nav>
        </Sidebar>
    );

}
