import React from "react";

import { Box, Card, CardHeader, CardBody, CardFooter, Heading } from "grommet";

export default function Settings() {

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                <Card pad="medium" background="light-1" flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                            설정
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical">
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </Box>
        </>
    );


}