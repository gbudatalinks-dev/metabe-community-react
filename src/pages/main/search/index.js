import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, TextInput, Grid, Image, Text,
} from "grommet";
import { Search as SearchIcon } from "grommet-icons";

// import * as tmImage from "@teachablemachine/image";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function Search(props) {

    const navigate = useNavigate();

    const [ models, setModels ] = React.useState([]);

    React.useEffect(() => {
        onLoad()
            .then(result => setModels(result));
    }, []);

    const onLoad = async () => {
        const querySnapshot = await getDocs(collection(db, "models"));
        const result = [];
        let t;
        querySnapshot.forEach((doc) => {
            t = { ...doc.data(), id: doc.id };
            result.push(t);
        });

        return result;
    };

    // const onTest = async () => {

        // let model, modelUrl, labelContainer, maxPredictions;
        // const isTM = selected.modelUrl !== undefined;
        //
        // if (isTM) {
        //     const url = selected.modelUrl;
        //     const modelUrl = url + "model.json";
        //     const metaDataUrl = url + "metadata.json";
        //     model = await tmImage.load(modelUrl, metaDataUrl);
        // }
        // else {
        //     const modelJsonRef = ref(storage, `models/${selected.uid}/${selected.modelId}/model/model.json`);
        //     modelUrl = await getDownloadURL(modelJsonRef);
        //     model = await tmImage.load(modelUrl);
        // }
        //
        // maxPredictions = model.getTotalClasses();
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }
        //
        // const image = document.getElementById("preview");
        // const prediction = await model.predict(image, false);
        // for (let i = 0; i < maxPredictions; i++) {
        //     const classPrediction =
        //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        //     labelContainer.childNodes[i].innerHTML = classPrediction;
        // }

    // };

    const route = (id) => {
        navigate(`/main/models/${id}`);
    };

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                <Card pad="medium" background="light-1" flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                            찾아보기
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical">
                        <Box width="medium" gap="medium" pad={{ bottom: "medium" }}>
                            <TextInput icon={<SearchIcon />} reverse placeholder="검색" />
                        </Box>
                        <Grid columns={{ count: 6, size: "auto" }} gap={"small"}>
                            { models.map((datum, index) =>
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
            </Box>
        </>
    );

}
