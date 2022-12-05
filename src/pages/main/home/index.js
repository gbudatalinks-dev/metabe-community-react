import React from "react";

import { throttle } from "lodash";
import { Box, Header, Text, Tag, Button } from "grommet";
import { TbSortDescending } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

import AppCard from "../../../components/card/app";

const transition = transitions.scaleDown;

export default function Home({ searchStrings, items, isLandscape, cardWidth, onRemoveSearch, onLoadMore, onAppClick, onUserClick }) {

    const onScroll = (e) => throttledScroll(e.target);
    const throttledScroll = React.useMemo(
        () =>
            throttle((target) => {
                const reachedToBottom = target.scrollHeight - target.scrollTop - 10 <= target.clientHeight;
                if (reachedToBottom) {
                    onLoadMore();
                }
            }, 300),
        [onLoadMore]
    );

    return (
        <Box fill>
            <Header pad={{ horizontal: "medium", vertical: "small" }}>
                <Box gap={"xlarge"} direction={"row"} width={"100%"}>
                    <Box flex={true} align={"start"} direction={"row"} gap={"small"}>
                        <Tag value={"전체"} size={"small"}
                             style={{ padding: "0 8px", backgroundColor: "#ff5a01" }}
                             onClick={() => console.log("select") }
                        />
                        <Tag value={"최신 업로드"} size={"small"}
                             style={{ padding: "0 8px", borderColor: "#ff5a01" }}
                             onClick={() => console.log("select") }
                        />
                        <Tag value={"최근 이용한 앱"} size={"small"}
                             style={{ padding: "0 8px", borderColor: "#ff5a01" }}
                             onClick={() => console.log("select") }
                        />
                        { searchStrings.map((str, index) =>
                            <Tag key={index} value={str} size={"small"}
                                 style={{ padding: "0 8px", backgroundColor: "#ff5a01" }}
                                 onRemove={() => console.log("remove") }
                            />
                        )}
                    </Box>
                    <Box align={"center"} direction={"row"}>
                        <Text size={"small"}>
                            { "최신 순" }
                        </Text>
                        <Button icon={<TbSortDescending size={18} />}
                                className="full-rounded disabled-focus"
                        />
                    </Box>
                </Box>
            </Header>
            <Box width={"100%"} pad={{ horizontal: "medium" }} margin={{ bottom: isLandscape? "18px" : "30px" }} overflow={"scroll"}
                 onScroll={onScroll}
            >
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
                    { items.map((item) =>
                        <AppCard key={item.uid} item={item} target={"apps"} onAppClick={onAppClick} onUserClick={onUserClick} />
                    )}
                </StackGrid>
            </Box>
        </Box>
    );

}
