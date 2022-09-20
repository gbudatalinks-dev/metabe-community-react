import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Card, CardHeader, CardBody, CardFooter, Heading, Text, Grid, Image } from "grommet";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Home() {

    const navigate = useNavigate();

    const [ newest, setNewest ] = React.useState([]);
    const [ hottest, setHottest ] = React.useState([]);

    React.useEffect(() => {
        const listAllUsers = () => {
            // TODO
        };

        const loadNewest = async () => {
            const q = query(collection(db, "models"), orderBy("datetime"), limit(5));
            const querySnapshot = await getDocs(q);
            const result = [];
            let t;
            querySnapshot.forEach((doc) => {
                t = { ...doc.data(), id: doc.id };
                result.push(t);
            });
            setNewest(result);
        };

        const loadHottest = async () => {
            const q = query(collection(db, "models"), orderBy("testCount"), limit(5));
            const querySnapshot = await getDocs(q);
            const result = [];
            let t;
            querySnapshot.forEach((doc) => {
                t = { ...doc.data(), id: doc.id };
                result.push(t);
            });
            setHottest(result);
        };

        loadNewest().then(() => loadHottest());
        listAllUsers();
    }, []);

    const route = (id) => {
        navigate(`/main/models/${id}`);
    };

    return (
        <>
            <Box pad={"medium"} background={"background-back"} flex={true} gap={"medium"} overflow={"scroll"}>
                <Card pad={"medium"} background={"light-1"} flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>
                            새로 올라온 모델
                        </Heading>
                    </CardHeader>
                    <CardBody fill={"vertical"}>
                        <Grid columns={{ count: 5, size: "auto" }} gap={"small"}>
                            { newest.map((datum, index) =>
                                <Card key={index} pad={"small"} onClick={() => route(datum.id)}>
                                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>
                                        <Text margin="none">
                                            { datum.name }
                                        </Text>
                                    </CardHeader>
                                    <CardBody round={"xsmall"} overflow={"hidden"}>
                                        <Image src={datum.cover} fit={"contain"} />
                                    </CardBody>
                                    <CardFooter pad={{ vertical: "xsmall" }}>
                                    </CardFooter>
                                </Card>
                            )}
                        </Grid>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
                <Card pad={"medium"} background={"light-1"} flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>
                            인기 모델
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical">
                        <Grid columns={{ count: 5, size: "auto" }} gap={"small"}>
                            { hottest.map((datum, index) =>
                                <Card key={index} pad={"small"}>
                                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>
                                        <Text margin="none">
                                            { datum.name }
                                        </Text>
                                    </CardHeader>
                                    <CardBody round={"xsmall"} overflow={"hidden"}>
                                        <Image src={datum.cover} fit={"contain"} />
                                    </CardBody>
                                    <CardFooter pad={{ vertical: "xsmall" }}>
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
