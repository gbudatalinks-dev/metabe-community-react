import React from "react";

import { Box, Header, Text, Tag, Button } from "grommet";
import { TbSortDescending, TbCaretDown } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

import PageHeader from "../../../components/header";
import AppCard from "../../../components/card/app";
import { useWindowSize } from "../../../utils/window";
import { randomNumberInRange } from "../../../utils/numbers";

const transition = transitions.scaleDown;




function getItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i, playCount: randomNumberInRange(0, 3000), likeCount: randomNumberInRange(0, 1200) });
    }
    return nextItems;
}



export default function Collections() {

    const [ windowWidth ] = useWindowSize();

    // eslint-disable-next-line no-unused-vars
    const [ items, setItems ] = React.useState(() => getItems(0, 30));

    return (
        <Box fill={true}>
            <PageHeader />
            <Header pad={{ horizontal: "medium", vertical: "small" }}>
                <Box gap={"xlarge"} direction={"row"} width={"100%"}>
                    <Box flex={true} align={"start"} direction={"row"} gap={"small"}>
                        <Tag value={"전체"} size={"small"}
                             style={{ padding: "0 8px", borderColor: "#ff5a01" }}
                             onClick={() => console.log("select") }
                        />
                        <Tag value={"검색 스트링"} size={"small"}
                             style={{ padding: "0 8px", backgroundColor: "#ff5a01" }}
                             onRemove={() => console.log("remove") }
                        />
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
            <Box width={"100%"} pad={"medium"} margin={{ bottom: "medium" }} overflow={"scroll"}>
                <StackGrid
                    monitorImagesLoaded
                    columnWidth={(windowWidth - 20 * 6 - 100) / 5}
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
                    { items.map((item) => <AppCard key={item.key} item={item} />) }
                    <Box align={"center"} pad={"medium"} margin={{ bottom: "medium" }}>
                        <Button primary size={"small"} style={{ width: 200, height: 60, borderRadius: 30 }}
                                icon={<TbCaretDown color={"#ffffff"} />}
                                label={<Text size={"small"} color={"#ffffff"} weight={"bolder"}>더보기</Text>}
                        />
                    </Box>
                </StackGrid>
            </Box>
        </Box>
    );

}
