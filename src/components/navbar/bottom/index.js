import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button } from "grommet";
import { TbListSearch, TbLayoutDashboard, TbTrophy } from "react-icons/tb";

export default function BottomBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const route = (path) => {
        navigate(path, { replace: true });
    };

    return (
        <Box width={"100%"} style={{ position: "fixed", bottom: 24, zIndex: 1000 }} align={"center"}>
            <Box elevation={"xsmall"} pad={{ vertical: "small", horizontal: "medium" }} round={"medium"} background={"background"}
                 gap={"medium"} direction={"row"}
            >
                <Button icon={<TbListSearch size={18} color={"#eeeeee"} />}
                        primary={(location.pathname === "/main" || location.pathname === "/main/home")}
                        onClick={() => route("/main/home")}
                />
                <Button icon={<TbLayoutDashboard size={18} color={"#eeeeee"} />}
                        primary={location.pathname === "/main/collections"}
                        onClick={() => route("/main/collections")}
                />
                {/*<Button icon={<TbBrandMessenger size={18} color={"#eeeeee"} />}*/}
                {/*        primary={current === "/main/chats"}*/}
                {/*        onClick={() => route("/main/chats")}*/}
                {/*/>*/}
                <Button icon={<TbTrophy size={18} color={"#eeeeee"} />}
                        primary={location.pathname === "/main/awards"}
                        onClick={() => route("/main/awards")}
                />
            </Box>
        </Box>
    );

}
