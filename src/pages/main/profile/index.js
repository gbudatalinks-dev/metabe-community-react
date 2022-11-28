import React from "react";

import {
    Box, Header, Avatar, Text, Tab, Tabs, Stack, Button
} from "grommet";
import { TbPencil } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

import { AppContext } from "../../../context";
import PageHeader from "../../../components/header";
import AppCard from "../../../components/card/app";
import ProfileCard from "../../../components/card/profile";
import { useWindowSize } from "../../../utils/window";
import { randomNumberInRange } from "../../../utils/numbers";

const transition = transitions.scaleDown;



function getAppItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i, playCount: randomNumberInRange(0, 3000), likeCount: randomNumberInRange(0, 1200) });
    }
    return nextItems;
}

function getProfiles(count) {
    const profiles = [];

    for (let i = 0; i < count; i++) {
        profiles.push({
            key: i + 1,
            name: "TestUSER",
            photoURL: "https://s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80",
            tags: ["TAG", "TEST", "AI", "APPS"],
            rank: randomNumberInRange(0, 12000),
            appCount: randomNumberInRange(5, 20),
            subscriberCount: randomNumberInRange(10, 2000),
            playCount: randomNumberInRange(10, 10000),
            likeCount: randomNumberInRange(10, 1000),
        });
    }

    return profiles;
}



export default function Profile(props) {

    const { globalState } = React.useContext(AppContext);
    const [ windowWidth ] = useWindowSize();

    const [ tabIndex, setTabIndex ]= React.useState(0);
    const onActive = (nextIndex) => setTabIndex(nextIndex);

    const [ apps, setApps ] = React.useState(() => getAppItems(0, 10));
    const [ bookmarks, setBookmarks ] = React.useState(() => getAppItems(1, 20));
    const [ subscriptions, setSubscriptions ] = React.useState(getProfiles(10));

    return (
        <Box fill={true}>
            <PageHeader />
            <Header direction={"column"}>
                <Box width={"100%"} align={"center"} pad={{ top: "medium" }} gap={"medium"}>
                    <Stack anchor={"bottom"}>
                        <Avatar src={globalState.user.photoURL} size={"3xl"} />
                        <Button label={<Text size={"xsmall"}>변경하기</Text>} size={"small"} margin={{ bottom: "small" }}
                                hoverIndicator
                                style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 12, border: "none", backgroundColor: "#00000050" }}
                        />
                    </Stack>
                    <Box direction={"row"} gap={"xsmall"} align={"center"}>
                        <Text margin={{ top: "1px" }}>
                            { globalState.user.name }
                        </Text>
                        <Button icon={<TbPencil />}
                                className="full-rounded disabled-focus"
                                style={{ padding: 8 }}
                                hoverIndicator
                        />
                    </Box>
                </Box>
                <Box width={"xxlarge"} align={"center"} pad={"medium"} responsive>
                    <Tabs activeIndex={tabIndex} onActive={onActive} justify="start">
                        <Tab title={"내 앱"} />
                        <Tab title={"즐겨찾기"} />
                        <Tab title={"구독"} />
                    </Tabs>
                </Box>
            </Header>
            <Box width={"xxlarge"} alignSelf={"center"} margin={{ bottom: "medium" }} overflow={"scroll"}>
                { tabIndex === 0 &&
                    <StackGrid
                        monitorImagesLoaded
                        columnWidth={(windowWidth * 0.7 - 20 * 6 - 100) / 5}
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
                        { apps.map((item) => <AppCard key={item.key} item={item}/>) }
                    </StackGrid>
                }
                { tabIndex === 1 &&
                    <StackGrid
                        monitorImagesLoaded
                        columnWidth={(windowWidth * 0.7 - 20 * 6 - 100) / 5}
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
                        { bookmarks.map((item) => <AppCard key={item.key} item={item}/>) }
                    </StackGrid>
                }
                { tabIndex === 2 &&
                    <StackGrid
                        monitorImagesLoaded
                        columnWidth={(windowWidth * 0.7 - 20 * 6 - 100) / 4}
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
                        { subscriptions.map((item) => <ProfileCard key={item.key} item={item}/>) }
                    </StackGrid>
                }
            </Box>
        </Box>
    );

}
