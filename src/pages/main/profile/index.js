import React from "react";

import {
    Box, Avatar, Text, Tab, Tabs
} from "grommet";

import { AppContext } from "../../../context";

export default function Profile(props) {

    const { globalState } = React.useContext(AppContext);

    const [ index, setIndex ]= React.useState(0);
    const onActive = (nextIndex) => setIndex(nextIndex);

    return (
        <Box pad="medium" flex={true} overflow="scroll">
            <Box width={"100%"} align={"center"} pad={{ top: "medium" }} gap={"medium"}>
                <Avatar src={globalState.user.photoURL} size={"3xl"} />
                <Text>
                    { globalState.user.name }
                </Text>
            </Box>
            <Box width={"100%"} align={"center"} pad={"large"}>
                <Tabs activeIndex={index} onActive={onActive} justify="start">
                    <Tab title={"내 앱"}>
                    </Tab>
                    <Tab title={"즐겨찾기"}>
                    </Tab>
                </Tabs>
            </Box>
        </Box>
    );

}
