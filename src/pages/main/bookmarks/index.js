import React from "react";

import { Box, Card, CardHeader, CardBody, CardFooter, Heading, Grid, Image, Text, TextInput } from "grommet";
import { Search as SearchIcon } from "grommet-icons/icons";

const TEMP_DATA = [
    {
        name: "Model #1",
        url: "https://picsum.photos/id/0/200",
        desc: "desc...",
    },
    {
        name: "Model #2",
        url: "https://picsum.photos/id/237/200",
        desc: "desc...",
    },
    {
        name: "Model #3",
        url: "https://picsum.photos/id/1060/200",
        desc: "desc...",
    },
    {
        name: "Model #4",
        url: "https://picsum.photos/id/1062/200",
        desc: "desc...",
    },
    {
        name: "Model #5",
        url: "https://picsum.photos/id/1080/200",
        desc: "desc...",
    },
    {
        name: "Model #6",
        url: "https://picsum.photos/id/111/200",
        desc: "desc...",
    },
    {
        name: "Model #7",
        url: "https://picsum.photos/id/133/200",
        desc: "desc...",
    },
    {
        name: "Model #8",
        url: "https://picsum.photos/id/250/200",
        desc: "desc...",
    },
    {
        name: "Model #9",
        url: "https://picsum.photos/id/535/200",
        desc: "desc...",
    },
];

export default function Bookmarks() {

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                <Card pad="medium" background="light-1" flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                            즐겨찾기
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical">
                        <Box width="medium" gap="medium" pad={{ bottom: "medium" }}>
                            <TextInput icon={<SearchIcon />} reverse placeholder="검색" />
                        </Box>
                        <Grid columns={{ count: 6, size: "auto" }} gap={"small"}>
                            { TEMP_DATA.map((datum, index) =>
                                <Card key={index} pad={"small"}>
                                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>
                                        <Text margin="none">
                                            { datum.name }
                                        </Text>
                                    </CardHeader>
                                    <CardBody round={"xsmall"} overflow={"hidden"}>
                                        <Image src={datum.url} fit={"contain"} />
                                    </CardBody>
                                    <CardFooter pad={{ top: "small", bottom: "xsmall" }}>
                                        <Text margin="none">
                                            { datum.desc }
                                        </Text>
                                    </CardFooter>
                                </Card>
                            )}
                        </Grid>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </Box>
        </>
    );

}
