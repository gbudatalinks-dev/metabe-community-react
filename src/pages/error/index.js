import React from "react";

import { Box, Text } from "grommet";
import { TbAccessibleOff } from "react-icons/tb"

export default function ErrorPage() {

    return (
        <Box fill align={"center"} justify={"center"}>
            <Box direction={"row"} align={"center"} gap={"small"}>
                <TbAccessibleOff size={40} />
                <Text size={"xxlarge"}>
                    경로를 찾을 수 없습니다.
                </Text>
            </Box>
        </Box>
    );

}
