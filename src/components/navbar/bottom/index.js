import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "grommet";
import { TbBrandMessenger, TbLayoutDashboard, TbListSearch } from "react-icons/tb";

export default function BottomBar() {

    const navigate = useNavigate();
    const [ current, setCurrent ] = React.useState("/main/home");

    const route = (path) => {
        setCurrent(path);
        navigate(path, { replace: true });
    };

    return (
        <Box width={"100%"} style={{ position: "fixed", bottom: 24, zIndex: 1000 }} align={"center"}>
            <Box elevation={"xsmall"} pad={{ vertical: "small", horizontal: "medium" }} round={"medium"} background={"background"}
                 gap={"medium"} direction={"row"}
            >
                <Button icon={<TbListSearch size={18} color={"#eeeeee"} />}
                        primary={current === "/main/home"}
                        onClick={() => route("/main/home")}
                />
                <Button icon={<TbLayoutDashboard size={18} color={"#eeeeee"} />}
                        primary={current === "/main/collections"}
                        onClick={() => route("/main/collections")}
                />
                <Button icon={<TbBrandMessenger size={18} color={"#eeeeee"} />}
                        primary={current === "/main/chats"}
                        onClick={() => route("/main/chats")}
                />
            </Box>
        </Box>
    );

}
