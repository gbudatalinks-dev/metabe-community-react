import React from "react";

import { Box, Header, Text, Tag, Button } from "grommet";
import { TbSortDescending, TbCaretDown } from "react-icons/tb";
import StackGrid, { transitions, easings } from "react-stack-grid";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// import { db } from "../../../config/firebase";
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



export default function Home() {

    // const navigate = useNavigate();
    const [ windowWidth ] = useWindowSize();

    // const [ newest, setNewest ] = React.useState([]);
    // const [ hottest, setHottest ] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [ items, setItems ] = React.useState(() => getItems(0, 30));

    React.useEffect(() => {
        // const listAllUsers = () => {
        //     // TODO
        // };
        //
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
        //
        // const loadHottest = async () => {
        //     const q = query(collection(db, "models"), orderBy("testCount"), limit(5));
        //     const querySnapshot = await getDocs(q);
        //     const result = [];
        //     let t;
        //     querySnapshot.forEach((doc) => {
        //         t = { ...doc.data(), id: doc.id };
        //         result.push(t);
        //     });
        //     setHottest(result);
        // };
        //
        // loadNewest().then(() => loadHottest());
        // listAllUsers();
    }, []);

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
            <Box width={"100%"} pad={"medium"} margin={{ bottom: "medium" }} overflow={"scroll"}>
                {/*<ResponsiveMasonry*/}
                {/*    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1600: 5 }}*/}
                {/*>*/}
                {/*    <Masonry gutter={"20px"}>*/}
                {/*        { items.map((item) => <AppCard key={item.key} item={item} />) }*/}
                {/*    </Masonry>*/}
                {/*</ResponsiveMasonry>*/}
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
