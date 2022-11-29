import React from "react";

import { Box, Text } from "grommet";
import { TbAlertTriangle } from "react-icons/tb"

export default function ErrorPage() {

    return (
        <Box fill align={"center"} justify={"center"}>
            <Box direction={"row"} align={"center"} gap={"small"}>
                <TbAlertTriangle size={32} color={"#ff5a01"} style={{ marginTop: 2 }} />
                <Text size={"large"} color={"brand"}>
                    경로를 찾을 수 없습니다.
                </Text>
            </Box>
        </Box>
    );

}
