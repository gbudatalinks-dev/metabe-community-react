import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Box, Header, TextInput, Avatar, Text, Tag, Image, Button, Layer, Anchor
} from "grommet";
import {
    TbSearch, TbBell, TbSortDescending, TbHandClick, TbApiApp,
    TbSettings, TbLogout, TbQuestionMark, TbMailForward
} from "react-icons/tb";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppContext } from "../../../context";


function getItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

const Item = ({ num }) => (
    <Box className="masonry-item" gap={"small"} style={{ width: "300px"}} >
        <Box className="overlay-container">
            <Image fit="cover" fill className="masonry-item-cover"
                   src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
            />
            <Box className="text-overlay-top">
                <Text size={"xsmall"}>이미지</Text>
            </Box>
            <Box className="text-overlay-bottom">
                <Text size={"xsmall"}>{`App Name ${num}`}</Text>
            </Box>
        </Box>
        <Box direction={"row"} justify={"between"} align={"center"}>
            <Box direction={"row"} align={"center"} gap={"small"}>
                <Avatar src={"https://s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"} size={"small"} />
                <Text size={"xsmall"}>
                    {`egjs ${num}`}
                </Text>
            </Box>
            <Box direction={"row"} align={"center"} gap={"small"} pad={{ top: "1px" }}>
                <Box direction={"row"} align={"center"} gap={"xsmall"}>
                    <TbHandClick size={14} style={{ marginTop: -1 }} />
                    <Text size={"xsmall"}>2.4K+</Text>
                </Box>
                {/*<Box direction={"row"} align={"center"} gap={"xsmall"}>*/}
                {/*    <TbThumbUp size={15} />*/}
                {/*    <Box direction={"row"} align={"baseline"}>*/}
                {/*        <Text size={"xsmall"}>1.1</Text>*/}
                {/*        <Text size={"8px"} color={"brand"} weight={"bolder"}>K+</Text>*/}
                {/*    </Box>*/}
                {/*</Box>*/}
                {/*<Box direction={"row"} align={"center"} gap={"xsmall"}>*/}
                {/*    <TbMessage2 size={16} />*/}
                {/*    <Text size={"xsmall"}>57</Text>*/}
                {/*</Box>*/}
            </Box>
        </Box>
    </Box>
);



export default function Home() {

    const navigate = useNavigate();

    const { globalState } = React.useContext(AppContext);

    const [ newest, setNewest ] = React.useState([]);
    const [ hottest, setHottest ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

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

    const route = (id) => {
        navigate(`/main/models/${id}`);
    };




    const [ items, setItems ] = React.useState(() => getItems(0, 10));




    return (
        <Box fill={true}>
            { open &&
                <Layer animation={"slide"} position={"top-right"} margin={{ top: "70px", right: "24px" }} background={"#282828"}
                       style={{ borderRadius: 16 }}
                       onClickOutside={onClose} onEsc={onClose}
                       modal
                       responsive
                >
                    <Box pad={{ vertical: "small" }} gap={"small"}>
                        <Box gap={"small"} align={"center"} direction={"row"} pad={{ horizontal: "medium" }} margin={{ right: "small" }}>
                            <Avatar src={globalState.user.photoURL} size={"32px"} style={{ border: "solid 2px #ff5a01"}} />
                            <Box gap={"xsmall"}>
                                <Text size={"small"}>
                                    { globalState.user.name }
                                </Text>
                                <Anchor color={"brand"} href={"#"} size={"small"}>
                                    계정 관리
                                </Anchor>
                            </Box>
                        </Box>
                        <div className={"divider"}/>
                        <Box gap={"small"} pad={{ horizontal: "medium" }}>
                            <Box gap={"medium"} align={"center"} direction={"row"} onClick={() => {}}>
                                <TbApiApp />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    내 앱 관리
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} onClick={() => {}}>
                                <TbSettings />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    설정
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} onClick={() => {}}>
                                <TbLogout style={{ marginLeft: 2, marginRight: -2 }} />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    로그아웃
                                </Text>
                            </Box>
                        </Box>
                        <div className={"divider"}/>
                        <Box gap={"small"} pad={{ horizontal: "medium" }}>
                            <Box gap={"medium"} align={"center"} direction={"row"} onClick={() => {}}>
                                <TbQuestionMark />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    고객 센터
                                </Text>
                            </Box>
                            <Box gap={"medium"} align={"center"} direction={"row"} onClick={() => {}}>
                                <TbMailForward />
                                <Text size={"small"} margin={{ top: "1px" }}>
                                    의견 보내기
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Layer>
            }
            <Header pad={"medium"} gap={"medium"} direction={"column"}>
                <Box gap={"xlarge"} direction={"row"} width={"100%"}>
                    <Box flex={true}>
                        <TextInput icon={<TbSearch color={"#cccccc"} style={{ marginLeft: 6 }} />} size={"small"}
                                   placeholder={"쉼표로 구분하여 검색 가능합니다."}
                        />
                    </Box>
                    <Box gap={"small"} align={"center"} direction={"row"}>
                        <Text size={"small"} margin={{ top: "2px" }}>
                            { globalState.user.name }
                        </Text>
                        <Avatar src={globalState.user.photoURL} size={"32px"} style={{ border: "solid 2px #ff5a01"}}
                                onClick={onOpen}
                        />
                        <Button icon={<TbBell size={18} />}
                                className="full-rounded disabled-focus"
                                style={{ padding: 10, marginLeft: -4, marginTop: 1 }}
                                hoverIndicator
                        />
                    </Box>
                </Box>
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
            <Box width={"100%"} pad={{ horizontal: "medium" }} margin={{ bottom: "medium" }} overflow={"scroll"}>
                <MasonryInfiniteGrid
                    className="container"
                    gap={24}
                    onRequestAppend={(e) => {
                        const nextGroupKey = e.groupKey + 1;
                        setItems([
                            ...items,
                            ...getItems(nextGroupKey, 10),
                        ]);
                    }}
                    onRenderComplete={(e) => {}}
                >
                    {
                        items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />)
                    }
                </MasonryInfiniteGrid>
            </Box>
            {/*<Card pad={"medium"} background={"light-1"} flex={"grow"}>*/}
            {/*    <CardHeader margin={{ "bottom": "xsmall" }}>*/}
            {/*        <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>*/}
            {/*            새로 올라온 모델*/}
            {/*        </Heading>*/}
            {/*    </CardHeader>*/}
            {/*    <CardBody fill={"vertical"}>*/}
            {/*        <Grid columns={{ count: 5, size: "auto" }} gap={"small"}>*/}
            {/*            { newest.map((datum, index) =>*/}
            {/*                <Card key={index} pad={"small"} onClick={() => route(datum.id)}>*/}
            {/*                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>*/}
            {/*                        <Text margin="none">*/}
            {/*                            { datum.name }*/}
            {/*                        </Text>*/}
            {/*                    </CardHeader>*/}
            {/*                    <CardBody round={"xsmall"} overflow={"hidden"}>*/}
            {/*                        <Image src={datum.cover} fit={"contain"} />*/}
            {/*                    </CardBody>*/}
            {/*                    <CardFooter pad={{ vertical: "xsmall" }}>*/}
            {/*                    </CardFooter>*/}
            {/*                </Card>*/}
            {/*            )}*/}
            {/*        </Grid>*/}
            {/*    </CardBody>*/}
            {/*    <CardFooter>*/}
            {/*    </CardFooter>*/}
            {/*</Card>*/}
            {/*<Card pad={"medium"} background={"light-1"} flex={"grow"}>*/}
            {/*    <CardHeader margin={{ "bottom": "xsmall" }}>*/}
            {/*        <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>*/}
            {/*            인기 모델*/}
            {/*        </Heading>*/}
            {/*    </CardHeader>*/}
            {/*    <CardBody fill="vertical">*/}
            {/*        <Grid columns={{ count: 5, size: "auto" }} gap={"small"}>*/}
            {/*            { hottest.map((datum, index) =>*/}
            {/*                <Card key={index} pad={"small"}>*/}
            {/*                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>*/}
            {/*                        <Text margin="none">*/}
            {/*                            { datum.name }*/}
            {/*                        </Text>*/}
            {/*                    </CardHeader>*/}
            {/*                    <CardBody round={"xsmall"} overflow={"hidden"}>*/}
            {/*                        <Image src={datum.cover} fit={"contain"} />*/}
            {/*                    </CardBody>*/}
            {/*                    <CardFooter pad={{ vertical: "xsmall" }}>*/}
            {/*                    </CardFooter>*/}
            {/*                </Card>*/}
            {/*            )}*/}
            {/*        </Grid>*/}
            {/*    </CardBody>*/}
            {/*    <CardFooter>*/}
            {/*    </CardFooter>*/}
            {/*</Card>*/}
        </Box>
    );

}
