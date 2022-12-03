import React from "react";

import { Box, Text } from "grommet";

export default function ProfileLayer({ uid }) {

    return (
        <Box>
            <Text size={"small"}>
                { uid }
            </Text>
        </Box>
    );

}
