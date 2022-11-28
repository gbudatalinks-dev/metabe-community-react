import React from "react";

import { Avatar, Box, Image, Text } from "grommet";
import { TbHandClick, TbThumbUp } from "react-icons/tb";

import { numberToString } from "../../../utils/numbers";

export default function AppCard({ item }) {

    return (
        <Box className="masonry-item" gap={"small"} margin={{ bottom: "small" }}>
            <Box className="overlay-container">
                <Image fit="cover" fill className="masonry-item-cover"
                       src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(item.key % 33) + 1}.jpg`}
                />
                <Box className="text-overlay-top">
                    <Text size={"xsmall"}>이미지</Text>
                </Box>
                <Box className="text-overlay-bottom">
                    <Text size={"xsmall"}>{`App Name ${item.key}`}</Text>
                </Box>
            </Box>
            <Box direction={"row"} justify={"between"} align={"center"}>
                <Box direction={"row"} align={"center"} gap={"small"}>
                    <Avatar src={"https://s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"} size={"small"} />
                    <Text size={"xsmall"}>
                        {`egjs ${item.key}`}
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
