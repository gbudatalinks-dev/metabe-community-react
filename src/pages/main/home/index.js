import React from "react";

import { throttle } from "lodash";
import { Box, Header, Text, Tag, Button, Layer } from "grommet";
import { TbSortDescending } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";

// import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// import { db } from "../../../config/firebase";
import PageHeader from "../../../components/header";
import AppCard from "../../../components/card/app";
import AppLayer from "../../../components/layer/app";
import { useWindowSize } from "../../../utils/window";
import { calGridCol } from "../../../utils/grid";

import { USERS, getItems } from "../../../temp/data";

const transition = transitions.scaleDown;

export default function Home() {

    const [ windowWidth, windowHeight ] = useWindowSize();
    const landscape = windowWidth > windowHeight;

    const [ items, setItems ] = React.useState([]);
    const [ loadMore, setLoadMore ] = React.useState(false);

    const [ selectedApp, setSelectedApp ] = React.useState(undefined);
    const [ selectedUser, setSelectedUser ] = React.useState(undefined);

    React.useEffect(() => {
        // const loadNewest = async () => {
        //     const q = query(collection(db, "models"), orderBy("datetime"), limit(5));
        //     const querySnapshot = await getDocs(q);
        //     const result = [];
        //     let t;
        //     querySnapshot.forEach((doc) => {
        //         t = { ...doc.data(), id: doc.id };
        //         result.push(t);
        //     });
        //     setNewest(result);
        // };
        // loadNewest().then(() => loadHottest());

        // const listAllUsers = () => {};

        const loadInitialItems = () => {
            setItems(getItems(0, 30, 0));
        };

        loadInitialItems();

    }, []);

    const onScroll = (e) => throttledScroll(e.target);
    const throttledScroll = React.useMemo(
        () =>
            throttle((target) => {
                // console.log(`scrollHeight: ${target.scrollHeight}, scrollTop: ${target.scrollTop}, clientHeight: ${target.clientHeight}`)
                const reachedToBottom = target.scrollHeight - target.scrollTop - 10 <= target.clientHeight;
                if (reachedToBottom !== loadMore) setLoadMore(reachedToBottom);
            }, 300),
        [loadMore]
    );

    const onAppClick = (uid) => {
        setSelectedApp(items[uid]);
    };

    const closeAppLayer = () => {
        setSelectedApp(undefined);
    };

    const onProfileClick = (uid) => {
        console.log(USERS[uid]);
    };

    return (
        <Box fill={true}>
            <PageHeader />
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
            { selectedApp !== undefined &&
                <Layer position={"center"} background={"background-back"}
                       style={{ borderRadius: 24 }}
                       onClickOutside={closeAppLayer} onEsc={closeAppLayer}
                       modal
                       responsive
                >
                    <AppLayer item={selectedApp} onClose={closeAppLayer} />
                </Layer>
            }
            <Box width={"100%"} pad={{ horizontal: "medium" }} margin={{ bottom: landscape? "18px" : "30px" }} overflow={"scroll"}
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
                    { items.map((item) =>
                        <AppCard key={item.key} item={item} onAppClick={onAppClick} onProfileClick={onProfileClick} />
                    )}
                </StackGrid>
            </Box>
        </Box>
    );

}
