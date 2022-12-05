import React from "react";

import { Avatar, Box, Button, Text, CheckBox } from "grommet";
import { TbX, TbMedal } from "react-icons/tb";

import { getRankColor } from "../../../utils/colors";
import StackGrid, {easings, transitions} from "react-stack-grid";
import AppCard from "../../card/app";

import { getItems } from "../../../temp/data";

const transition = transitions.scaleDown;

const Tag = ({ children, ...rest }) => {
    return (
        <Box
            direction={"row"}
            align={"center"}
            border={{ size: "xsmall", color: "brand" }}
            pad={"xsmall"}
            margin={{ bottom: "xsmall" }}
            round={"medium"}
            {...rest}
        >
            <Text size={"13px"} color={"#eeeeee"} margin={{ horizontal: "xsmall" }}>
                { children }
            </Text>
        </Box>
    );
};

export default function ProfileLayer({ cardWidth, user, isSubscribed, onClose, onAppClick }) {

    const [ apps, setApps ] = React.useState([]);
    const [ subscription, setSubscription ] = React.useState(isSubscribed);

    React.useEffect(() => {
        setApps(getItems(0, 8));
    }, [user.uid]);

    return (
        <Box width={"xlarge"} pad={"medium"}>
            <Box round={"small"} width={"32px"} height={"32px"} align={"center"} justify={"center"} overflow={"hidden"} background={"brand"}
                 style={{ position: "absolute", top: 30, right: 24, }}
            >
                <Button size={"small"} icon={<TbX color={"#eeeeee"} />} onClick={() => onClose()} />
            </Box>
            <Box width={"100%"} align={"center"} pad={{ vertical: "small" }} gap={"medium"}>
                <Avatar src={user.photoURL} size={"3xl"} />
                <Box direction={"row"} gap={"small"} align={"center"}>
                    <TbMedal size={"24px"} color={getRankColor(user.rank)} />
                    <Text margin={{ top: "1px" }}>
                        { user.name }
                    </Text>
                </Box>
                <Box direction={"row"} gap={"xsmall"} wrap>
                    { user.tags !== undefined && user.tags.length > 0 &&
                        user.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)
                    }
                </Box>
                <Box pad={{ bottom: "small" }}>
                    <CheckBox label={<Text size={"small"} color={"text-weak"}>구독</Text>}
                              checked={subscription}
                              onChange={(event) => setSubscription(event.target.checked)}
                              toggle
                    />
                </Box>
            </Box>
            <Box width={"100%"} height={"480px"} pad={"medium"} overflow={"scroll"}>
                <StackGrid
                    monitorImagesLoaded
                    columnWidth={cardWidth}
                    duration={600}
                    gutterWidth={20}
                    gutterHeight={20}
                    easing={easings.cubicOut}
                    appearDelay={60}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                >
                    { apps.map((item) => <AppCard key={item.uid} item={item} target={"myApps"} onAppClick={onAppClick} />) }
                </StackGrid>
            </Box>
        </Box>
    );

}
