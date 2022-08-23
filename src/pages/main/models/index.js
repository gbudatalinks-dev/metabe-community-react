import React from "react";
import { useParams } from "react-router-dom";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Layer
} from "grommet";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import UseModel from "./UseModel";

export default function Models(props) {

    const { modelId } = useParams();

    const [ name, setName ] = React.useState("");
    const [ description, setDescription ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState(undefined);
    const [ labels, setLabels ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);

    React.useEffect(() => {
        const loadModel = async () => {
            const docRef = doc(db, "models", modelId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setName(data.name);
            setDescription(data.description);
            setModelUrl(data.modelUrl);
            setLabels(data.labels);
        };
        loadModel();
    }, [modelId]);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Box pad="medium" background="background-back" flex={true} overflow="scroll">
            { open &&
                <Layer position={"center"}
                       onClickOutside={onClose}
                       onEsc={onClose}
                >
                    <UseModel url={modelUrl} labels={labels} onClose={onClose} />
                </Layer>
            }
            <Card pad="medium" background="light-1" flex={"grow"}>
                <CardHeader margin={{ "bottom": "xsmall" }}>
                    <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                        { name }
                    </Heading>
                </CardHeader>
                <CardBody fill="vertical" gap="medium">
                    <Box>
                        <div dangerouslySetInnerHTML={ {__html: description} } />
                    </Box>
                </CardBody>
                <CardFooter>
                    <Box as="footer" gap="small" direction="row" align="center" justify="end"
                         pad={{ top: "medium", bottom: "small" }}
                    >
                        <Button
                            label={
                                <Text color="white">
                                    <strong>테스트 하기</strong>
                                </Text>
                            }
                            primary
                            onClick={() => setOpen(true)}
                        />
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    );

}
