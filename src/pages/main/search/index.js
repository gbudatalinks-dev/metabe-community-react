import React from "react";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, TextInput, Grid, Image, Text,
    Layer, FormField, FileInput, Button, Spinner
} from "grommet";
import { Search as SearchIcon } from "grommet-icons";

import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../config/firebase";

export default function Search(props) {

    const [ models, setModels ] = React.useState([]);
    const [ selected, setSelected] = React.useState(undefined);
    const [ image, setImage ] = React.useState(undefined);
    const [ testing, setTesting ] = React.useState(false);

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

    const onTest = async () => {
        setTesting(true);

        let model, labelContainer, maxPredictions;
        const modelJsonRef = ref(storage, `models/${selected.uid}/${selected.modelId}/model/model.json`);
        const modelUrl = await getDownloadURL(modelJsonRef);

        model = await tmImage.load(modelUrl);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }

        const image = document.getElementById("preview");
        const prediction = await model.predict(image, false);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        setTesting(false);
    };

    const onOpen = (id) => setSelected(id);
    const onClose = () => {
        setImage(undefined);
        setSelected(undefined);
        setTesting(false);
    };

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                { selected !== undefined && (
                    <Layer position={"center"}
                           onClickOutside={onClose}
                           onEsc={onClose}
                    >
                        <Box pad="medium" gap="small" width="large">
                            <Heading level={3} margin={{ bottom: "small" }}>
                                { selected.name }
                            </Heading>
                            <Text>
                                { selected.description }
                            </Text>
                            <FormField label="테스트 이미지" name="cover">
                                <FileInput
                                    accept="image/*"
                                    messages={{
                                        browse: "선택",
                                        dropPrompt: "파일을 여기에 드래그 하세요.",
                                        remove: "삭제",
                                    }}
                                    onChange={(event, { files }) => {
                                        let reader = new FileReader();
                                        let file = files[0];
                                        reader.onloadend = () => {
                                            setImage(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                            </FormField>
                            <Box>
                                { image !== undefined && <Image src={image} id={"preview"} /> }
                                <div id="label-container"></div>
                            </Box>
                            <Box as="footer" gap="small" direction="row" align="center" justify="end"
                                 pad={{ top: "medium", bottom: "small" }}
                            >
                                <Button
                                    label="취소"
                                    color="dark-3"
                                    onClick={onClose}
                                />
                                <Button
                                    label={
                                        testing ?
                                            <Box align="center" justify="center" gap="small" direction="row" alignSelf="center">
                                                <Spinner color={"white"} />
                                                <Text color="white">
                                                    <strong>처리중</strong>
                                                </Text>
                                            </Box> :
                                            <Text color="white">
                                                <strong>테스트</strong>
                                            </Text>
                                    }
                                    onClick={onTest}
                                    disabled={testing}
                                    primary
                                />
                            </Box>
                        </Box>
                    </Layer>
                ) }
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
                                <Card key={index} pad={"small"} onClick={() => onOpen(datum)}>
                                    <CardHeader pad={{ top: "xsmall", bottom: "small" }}>
                                        <Text margin="none">
                                            { datum.name }
                                        </Text>
                                    </CardHeader>
                                    <CardBody round={"xsmall"} overflow={"hidden"}>
                                        <Image src={datum.cover} />
                                    </CardBody>
                                    <CardFooter pad={{ top: "small", bottom: "xsmall" }}>
                                        <Text margin="none">
                                            { datum.description }
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
