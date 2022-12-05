import React from "react";

import { Box, Avatar, Text } from "grommet";
import { TbMedal, TbTags, TbDashboard, TbApps, TbToggleRight, TbHandClick } from "react-icons/tb";

import { numberToString } from "../../../utils/numbers";
import { getRankColor }from "../../../utils/colors";

export default function ProfileCard({ item, onUserClick }) {

    return (
        <Box className="masonry-item disabled-focus"
             width={"100%"} gap={"medium"} margin={{ bottom: "small" }} pad={"medium"}
             background={"background-front"}
             round={"medium"}
             onClick={() => onUserClick(item.uid)}
        >
            <Box width={"100%"} direction={"row"} gap={"small"} align={"stretch"}>
                <Avatar src={item.photoURL} />
                <Box flex gap={"xsmall"}>
                    <Box direction={"row"} gap={"xsmall"} align={"center"}>
                        <Text size={"small"}>
                            { item.name }
                        </Text>

                    </Box>
                    <Box direction={"row"} gap={"xsmall"} wrap>
                        <TbTags color={"#ff5a01"} />
                        { item.tags !== undefined && item.tags.length > 0 && item.tags.map((tag, index) =>
                            <Text key={index} size={"xsmall"} color={"text-xweak"}>
                                { tag }
                            </Text>
                        )}
                    </Box>
                </Box>
                <Box align={"end"} alignContent={"start"}>
                    <TbMedal size={"24px"} color={getRankColor(item.rank)} />
                </Box>
            </Box>
            <Box direction={"row"} gap={"medium"} align={"center"}>
                <Box direction={"row"} gap={"xsmall"}>
                    <TbDashboard style={{ marginTop: -1 }} />
                    <Text size={"xsmall"}>
                        { numberToString(item.rank) }
                    </Text>
                </Box>
                <Box direction={"row"} gap={"xsmall"}>
                    <TbApps />
                    <Text size={"xsmall"}>
                        { numberToString(item.appCount) }
                    </Text>
                </Box>
                <Box direction={"row"} gap={"xsmall"}>
                    <TbToggleRight />
                    <Text size={"xsmall"}>
                        { numberToString(item.subscriberCount) }
                    </Text>
                </Box>
                <Box direction={"row"} gap={"xsmall"}>
                    <TbHandClick />
                    <Text size={"xsmall"}>
                        { numberToString(item.playCount) }
                    </Text>
                </Box>
            </Box>
        </Box>
    );

}
