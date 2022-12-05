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

import { getItems, getProfiles } from "../../../temp/data";

const transition = transitions.scaleDown;

export default function Profile(props) {

    const { globalState } = React.useContext(AppContext);
    const [ windowWidth ] = useWindowSize();

    const [ tabIndex, setTabIndex ]= React.useState(0);
    const onActive = (nextIndex) => setTabIndex(nextIndex);

    // eslint-disable-next-line no-unused-vars
    const [ apps, setApps ] = React.useState(() => getItems(0, 10));
    // eslint-disable-next-line no-unused-vars
    const [ bookmarks, setBookmarks ] = React.useState(() => getItems(1, 20));
    // eslint-disable-next-line no-unused-vars
    const [ subscriptions, setSubscriptions ] = React.useState(getProfiles());

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
