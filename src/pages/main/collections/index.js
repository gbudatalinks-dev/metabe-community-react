import React from "react";

import { throttle } from "lodash";
import { Box, Header, Text, Tag, Button } from "grommet";
import { TbSortDescending } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

import PageHeader from "../../../components/header";
import AppCard from "../../../components/card/app";
import { useWindowSize } from "../../../utils/window";
import { calGridCol } from "../../../utils/grid";
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

    // const navigate = useNavigate();
    const [ windowWidth, windowHeight ] = useWindowSize();
    const landscape = windowWidth > windowHeight;

    // eslint-disable-next-line no-unused-vars
    const [ items, setItems ] = React.useState(() => getItems(1, 30));
    const [ loadMore, setLoadMore ] = React.useState(false);

    React.useEffect(() => {
    }, []);

    const onScroll = (e) => throttledScroll(e.target);
    const throttledScroll = React.useMemo(
        () =>
            throttle((target) => {
                const reachedToBottom = target.scrollHeight - target.scrollTop - 10 <= target.clientHeight;
                if (reachedToBottom !== loadMore) setLoadMore(reachedToBottom);
            }, 300),
        [loadMore]
    );

    return (
        <Box fill={true}>
            <PageHeader />
            <Header pad={{ horizontal: "medium", vertical: "small" }}>
                <Box gap={"xlarge"} direction={"row"} width={"100%"}>
                    <Box flex={true} align={"start"} direction={"row"} gap={"small"}>
                        <Tag value={"전체"} size={"small"}
                             style={{ padding: "2px 8px", borderColor: "#FF8341" }}
                             onClick={() => console.log("select") }
                        />
                        <Tag value={"검색 스트링"} size={"small"}
                             style={{ padding: "2px 8px", backgroundColor: "#FF8341" }}
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
            <Box width={"100%"} pad={{ horizontal: "medium" }} margin={{ bottom: landscape? "24px" : "30px" }} overflow={"scroll"}
                 onScroll={onScroll}
            >
                <StackGrid
                    monitorImagesLoaded
                    columnWidth={calGridCol(windowWidth, landscape, 20)}
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
                </StackGrid>
            </Box>
        </Box>
    );

}
