import React from "react";

import { Avatar, Box, Image, Text } from "grommet";
import { TbHandClick, TbThumbUp } from "react-icons/tb";

import { numberToString } from "../../../utils/numbers";

export default function AppCard({ item, onAppClick, onProfileClick }) {

    return (
        <Box className="masonry-item" gap={"small"} margin={{ bottom: "small" }}>
            <Box className="overlay-container disabled-focus" onClick={() => {onAppClick(item.uid)}}>
                <Image fit="cover" fill className="masonry-item-cover"
                       src={item.cover}
                />
                <Box className="text-overlay-top">
                    <Text size={"xsmall"}>
                        { item.type }
                    </Text>
                </Box>
                <Box className="text-overlay-bottom">
                    <Text size={"xsmall"}>
                        { item.name }
                    </Text>
                </Box>
            </Box>
            <Box direction={"row"} justify={"between"} align={"center"}>
                <Box className="disabled-focus" direction={"row"} align={"center"} gap={"8px"} onClick={() => onProfileClick(item.user.uid)}>
                    <Avatar src={item.user.avatar} size={"small"} />
                    <Text size={"xsmall"}>
                        { item.user.name }
                    </Text>
                </Box>
                <Box direction={"row"} align={"center"} gap={"small"} pad={{ top: "1px" }}>
                    <Box direction={"row"} align={"center"} gap={"xsmall"}>
                        <TbHandClick size={14} style={{ marginTop: -1 }} />
                        <Text size={"xsmall"}>
                            { numberToString(item.playCount) }
                        </Text>
                    </Box>
                    <Box direction={"row"} align={"center"} gap={"xsmall"}>
                        <TbThumbUp size={15} />
                        <Text size={"xsmall"}>
                            { numberToString(item.likeCount) }
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}
