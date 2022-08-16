import React from "react";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, List, Menu, Layer,
    Form, FormField, TextInput, FileInput, Button, Text, TextArea, Spinner
} from "grommet";
import { More } from "grommet-icons";
import axios from "axios";

import { collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../config/firebase";
import { AppContext } from "../../../context";
import { isEmptyStr } from "../../../utils/strings";

function getExtension(filename) {
    const i = filename.lastIndexOf(".");
    return (i < 0) ? "" : filename.substr(i);
}

export default function Manage() {

    const [ models, setModels ] = React.useState([]);
    const [ cloudModels, setCloudModels ] = React.useState([]);
    const [ modelWeightFiles, setModelWeightsFiles ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ name, setName ] = React.useState("");
    const [ cover, setCover ] = React.useState(undefined);
    const [ modelJsonFile, setModelJsonFile ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ uploading, setUploading ] = React.useState(false);
    const [ isTM, setIsTM ] = React.useState(false);
    const [ isLoadedFromCloud, setIsLoadedFromCloud ] = React.useState(false);

    const { globalState } = React.useContext(AppContext);

    React.useEffect(() => {
        if (uploading === false) {
            onLoad()
                .then(result => setModels(result));
        }
        // eslint-disable-next-line
    }, [globalState.user.uid, uploading]);

    const onLoad = async () => {
        const q = query(collection(db, "models"), where("uid", "==", globalState.user.uid));

        const querySnapshot = await getDocs(q);
        const result = [];
        let t;
        querySnapshot.forEach((doc) => {
            t = { ...doc.data(), id: doc.id };
            result.push(t);
        });

        return result;
    };

    const onLoadFromCloud = async () => {
        const token = sessionStorage.getItem("GoogleAccessToken");

        try {
            const jsonFiles = await axios({
                method: "get",
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {"Authorization" : "Bearer " + token,
                    "Content-Type" : "application/json"},
                params: {
                    "q": "mimeType = 'application/json'",
                    "fields": 'files(name, id)',
                    "spaces": 'drive',
                },
            });

            setCloudModels(jsonFiles.data.files);

            const weightFiles = await axios({
                method: "get",
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {"Authorization" : "Bearer " + token,
                    "Content-Type" : "application/json"},
                params: {
                    "q": "name contains 'weights.bin'",
                    "fields": 'files(name, id)',
                    "spaces": 'drive',
                },
            });

            setModelWeightsFiles(weightFiles.data.files);
            setIsLoadedFromCloud(true);

        } catch(error) {
            console.log(error);
        }
    };

    const onUpload = async () => {
        const modelUri = isTM ? `models/${globalState.user.uid}/tm_${new Date().getTime()}` : `models/${globalState.user.uid}/${modelJsonFile.id}`;

        const data = isTM ? {
            name: name,
            uid: globalState.user.uid,
            description: description,
            modelUrl: modelUrl,
        } : {
            name: name,
            uid: globalState.user.uid,
            description: description,
            modelId: modelJsonFile.id,
        };

        const docRef = await addDoc(collection(db, "models"), data);

        // Cover Upload
        const coverRef = ref(storage, `${modelUri}/cover${getExtension(cover.name)}`);
        uploadBytes(coverRef, cover).then((snapshot) => {
            getDownloadURL(coverRef)
                .then(url => updateDoc(docRef, { cover: url }));
        });

        if (isTM === false) {
            // Model Upload from Google Cloud
            const fileName = modelJsonFile.name.split('.')[0];
            const weightFile = modelWeightFiles.filter(f => f.name === `${fileName}.weights.bin`)[0];

            const modelJsonFileRef = ref(storage, `${modelUri}/model/model.json`);
            const modelWeightFileRef = ref(storage, `${modelUri}/model/model.weights.bin`);

            const token = sessionStorage.getItem("GoogleAccessToken");
            let response;

            try {
                response = await axios({
                    method: "get",
                    url: "https://www.googleapis.com/drive/v3/files/" + modelJsonFile.id + "",
                    headers: {"Authorization" : "Bearer " + token,
                        "Content-Type" : "application/json"},
                    params: {
                        "alt": 'media',
                    },
                    responseType: "blob",
                });

                uploadBytes(modelJsonFileRef, response.data).then((snapshot) => {
                    console.log('Uploaded json file!');
                });

                response = await axios({
                    method: "get",
                    url: "https://www.googleapis.com/drive/v3/files/" + weightFile.id + "",
                    headers: {"Authorization" : "Bearer " + token,
                        "Content-Type" : "application/json"},
                    params: {
                        "alt": 'media',
                    },
                    responseType: "blob",
                });

                uploadBytes(modelWeightFileRef, response.data).then((snapshot) => {
                    console.log('Uploaded bin file!');
                });

            } catch(error) {
                console.log(error);
            }
        }
    };

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const onCreate = (id) => {
        setModelJsonFile(cloudModels.filter(m => m.id === id)[0]);
        onOpen();
    };

    const onCreateWithTMModel = () => {
        setIsTM(true);
        onOpen();
    };

    const onModify = (id) => {
        console.log(id);
    };

    const onDelete = (id) => {
        console.log(id);
    };

    const onReset = () => {
        setName("");
        setCover(undefined);
        setModelJsonFile(undefined);
        setModelUrl("");
        setDescription("");
        setUploading(false);
        setIsTM(false);
        onClose();
    };

    const onSubmit = () => {
        setUploading(true);
        onUpload()
            .then(() => {
                onReset();
                setUploading(false);
                onLoad()
                    .then(result => setModels(result));
            });
    };

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                { open && (
                    <Layer position={"center"}
                           onClickOutside={onReset}
                           onEsc={onReset}
                    >
                        <Box pad="medium" gap="small" width="large">
                            <Heading level={3} margin={{ bottom: "small" }}>
                                공유하기
                            </Heading>
                            <Form onSubmit={onSubmit} onReset={onReset}>
                                <FormField label="모델명" name="name" required error={isEmptyStr(name) ? "필수 항목입니다." : undefined}>
                                    <TextInput name="name" value={name} onChange={(event) => setName(event.target.value)} />
                                </FormField>
                                <FormField label="대표 이미지" name="cover">
                                    <FileInput
                                        accept="image/*"
                                        messages={{
                                            browse: "선택",
                                            dropPrompt: "파일을 여기에 드래그 하세요.",
                                            remove: "삭제",
                                        }}
                                        onChange={(event, { files }) => {
                                            setCover(files[0]);
                                        }}
                                    />
                                </FormField>
                                { isTM === false &&
                                    <FormField label="모델 파일" name="modelFile">
                                        <TextInput name="modelFile" value={modelJsonFile.name} disabled />
                                    </FormField>
                                }
                                { isTM === true &&
                                    <FormField label="모델 URL" name="modelUrl" required error={isEmptyStr(modelUrl) ? "필수 항목입니다." : undefined}>
                                        <TextInput name="modelUrl" value={modelUrl} onChange={(event) => setModelUrl(event.target.value)} />
                                    </FormField>
                                }
                                <FormField label="모델 설명">
                                    <TextArea name="comments" placeholder={"설명을 입력해 주세요."} onChange={(event) => setDescription(event.target.value)} />
                                </FormField>
                                <Box as="footer" gap="small" direction="row" align="center" justify="end"
                                     pad={{ top: "medium", bottom: "small" }}
                                >
                                    <Button
                                        label="취소"
                                        color="dark-3"
                                        type="reset"
                                    />
                                    <Button
                                        label={
                                            uploading ?
                                                <Box align="center" justify="center" gap="small" direction="row" alignSelf="center">
                                                    <Spinner color={"white"} />
                                                    <Text color="white">
                                                        <strong>업로딩</strong>
                                                    </Text>
                                                </Box> :
                                                <Text color="white">
                                                    <strong>공유하기</strong>
                                                </Text>
                                        }
                                        type="submit"
                                        disabled={uploading}
                                        primary
                                    />
                                </Box>
                            </Form>
                        </Box>
                    </Layer>
                ) }
                <Card pad="medium" background="light-1" flex={"grow"}>
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                            모델 관리
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical" gap="medium">
                        <Card pad="medium" background="light-1" flex={"grow"}>
                            <CardHeader margin={{ "bottom": "xsmall" }}>
                                <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>
                                    등록된 모델
                                </Heading>
                            </CardHeader>
                            <CardBody fill="vertical">
                                <List data={models}
                                      pad={{ left: "small", right: "none" }}
                                      action={(item, index) => (
                                          <Menu key={index} icon={<More />}
                                                items={[
                                                    { label: "등록", onClick: () => onCreate(item.id) },
                                                    { label: "수정", onClick: () => onModify(item.id) },
                                                    { label: "삭제", onClick: () => onDelete(item.id) }
                                                ]}
                                          />
                                      )}
                                >
                                    {(datum) => (
                                        <Text weight="bold">{ datum.name }</Text>
                                    )}
                                </List>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                        { isLoadedFromCloud &&
                            <Card pad="medium" background="light-1" flex={"grow"}>
                                <CardHeader margin={{ "bottom": "xsmall" }}>
                                    <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>
                                        클라우드 등록 모델
                                    </Heading>
                                </CardHeader>
                                <CardBody fill="vertical">
                                    <List data={cloudModels}
                                          pad={{ left: "small", right: "none" }}
                                          action={(item, index) => (
                                              <Menu key={index} icon={<More />}
                                                    items={[
                                                        { label: "등록", onClick: () => onCreate(item.id) },
                                                        { label: "수정", onClick: () => onModify(item.id) },
                                                        { label: "삭제", onClick: () => onDelete(item.id) }
                                                    ]}
                                              />
                                          )}
                                    >
                                        {(datum) => (
                                            <Text weight="bold">{ datum.name }</Text>
                                        )}
                                    </List>
                                </CardBody>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        }
                    </CardBody>
                    <CardFooter>
                        <Box as="footer" gap="small" direction="row" align="center" justify="end"
                             pad={{ top: "medium", bottom: "small" }}
                        >
                            <Button
                                label={
                                    <Text color="white">
                                        <strong>클라우드 모델 동기화</strong>
                                    </Text>
                                }
                                onClick={onLoadFromCloud}
                                primary
                            />
                            <Button
                                label={
                                    <Text color="white">
                                        <strong>TM 모델 등록</strong>
                                    </Text>
                                }
                                onClick={onCreateWithTMModel}
                                primary
                            />
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
        </>
    );

}
