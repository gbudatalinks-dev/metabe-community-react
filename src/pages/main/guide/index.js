import React from "react";

import { Box, Text } from "grommet";
import { TbBackhoe } from "react-icons/tb"

export default function Guide() {

    return (
        <Box fill align={"center"} justify={"center"}>
            <Box direction={"row"} align={"center"} gap={"small"}>
                <TbBackhoe size={32} style={{ marginTop: -3 }} />
                <Text size={"large"}>
                    추후 업데이트 예정입니다.
                </Text>
            </Box>
        </Box>
    );

}
