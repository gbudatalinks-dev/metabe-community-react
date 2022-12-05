import React from "react";

import {
    Box, Header, Avatar, Text, Tab, Tabs, Stack, Button
} from "grommet";
import { TbPencil, TbMedal } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

import { AppContext } from "../../../context";
import AppCard from "../../../components/card/app";
import ProfileCard from "../../../components/card/profile";
import TagInput from "../../../components/tag";
import { getRankColor } from "../../../utils/colors";

const transition = transitions.scaleDown;

export default function Profile({ cardWidth, isLandscape, myApps, bookmarks, subscriptions, onAppClick, onUserClick }) {

    const { globalState } = React.useContext(AppContext);

    const [ tabIndex, setTabIndex ]= React.useState(0);
    const onActive = (nextIndex) => setTabIndex(nextIndex);

    const [ photoURL, setPhotoURL ] = React.useState(globalState.user.photoURL);
    const [ name, setName ] = React.useState(globalState.user.name);
    const [ tags, setTags ] = React.useState(globalState.user.tags);

    const onRemoveTag = (tag) => {
        const removeIndex = tags.indexOf(tag);
        const newTags = [...tags];
        if (removeIndex >= 0) {
            newTags.splice(removeIndex, 1);
        }
        setTags(newTags);
    };

    const onAddTag = (tag) => setTags([...tags, tag]);

    return (
        <Box fill>
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
                        <TbMedal size={"24px"} color={getRankColor(globalState.user.rank)} style={{ marginRight: 6 }} />
                        <Text margin={{ top: "1px" }}>
                            { globalState.user.name }
                        </Text>
                        <Button icon={<TbPencil />}
                                className="full-rounded disabled-focus"
                                style={{ padding: 8 }}
                                hoverIndicator
                        />
                    </Box>
                    <TagInput placeholder="태그" value={tags} onRemove={onRemoveTag} onAdd={onAddTag} pad={7} />
                </Box>
                <Box width={"xxlarge"} align={"center"} pad={"medium"} responsive>
                    <Tabs activeIndex={tabIndex} onActive={onActive} justify="start">
                        <Tab title={"내 앱"} />
                        <Tab title={"즐겨찾기"} />
                        <Tab title={"구독"} />
                    </Tabs>
                </Box>
            </Header>
            <Box width={"100%"} pad={{ horizontal: "medium" }} margin={{ bottom: isLandscape? "18px" : "30px" }} overflow={"scroll"}>
                { tabIndex === 0 &&
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
                        { myApps.map((item) => <AppCard key={item.uid} item={item} target={"myApps"} onAppClick={onAppClick} onUserClick={onUserClick} />) }
                    </StackGrid>
                }
                { tabIndex === 1 &&
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
                        { bookmarks.map((item) => <AppCard key={item.uid} item={item} target={"bookmarks"} onAppClick={onAppClick} onUserClick={onUserClick} />) }
                    </StackGrid>
                }
                { tabIndex === 2 &&
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
                        { subscriptions.map((item) => <ProfileCard key={item.uid} item={item} onUserClick={onUserClick} />) }
                    </StackGrid>
                }
            </Box>
        </Box>
    );

}
