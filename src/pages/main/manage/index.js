import React from "react";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, List, Menu, Layer,
    Form, FormField, TextInput, FileInput, Button, Text, TextArea, Spinner
} from "grommet";
import { More } from "grommet-icons";
// import axios from "axios";

import { collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../config/firebase";
import { AppContext } from "../../../context";
import { isEmptyStr, strStartsWith } from "../../../utils/strings";

function getExtension(filename) {
    const i = filename.lastIndexOf(".");
    return (i < 0) ? "" : filename.substr(i);
}

export default function Manage() {

    const [ models, setModels ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ name, setName ] = React.useState("");
    const [ cover, setCover ] = React.useState(undefined);
    const [ model, setModel ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ uploading, setUploading ] = React.useState(false);

    const { globalState } = React.useContext(AppContext);

    React.useEffect(() => {
        // loadFiles()
        //     .then(files => {
        //         setFiles(files);
        //         console.log(globalState.user.uid);
        //     });
        if (uploading === false) {
            onLoad()
                .then(result => setModels(result));
        }
    }, [globalState.user.uid, uploading]);

    // const onLoad = async () => {
    //     const token = sessionStorage.getItem("GoogleAccessToken");
    //
    //     try {
    //         const files = await axios({
    //             method: "get",
    //             url: "https://www.googleapis.com/drive/v3/files",
    //             headers: {
    //                 "Authorization" : "Bearer " + token,
    //                 "Content-Type" : "application/json"
    //             },
    //             params: {
    //                 "q": "name = 'my-model-1.weights.bin'",
    //                 "fields": "files(id,name)",
    //                 "spaces": "drive",
    //             },
    //         });
    //
    //         return files.data.files;
    //
    //     } catch(error) {
    //         console.log(error);
    //     }
    // };

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

    const onUpload = async () => {
        const docRef = await addDoc(collection(db, "models"), {
            name: name,
            uid: globalState.user.uid,
            description: description,
            modelUrl: modelUrl,
        });

        const coverRef = ref(storage, `${docRef.id}/cover${getExtension(cover.name)}`);
        // const modelRef = ref(storage, `${docRef.id}/model.bin`);

        uploadBytes(coverRef, cover).then((snapshot) => {
            console.log(snapshot);
            getDownloadURL(coverRef)
                .then(url => updateDoc(docRef, { cover: url }));
        });

        // for (const file of model) {
        //     const fileRef = ref(storage, `${docRef.id}/${file.name}`);
        //     await uploadBytes(fileRef, file);
        //     if (strStartsWith(file.name, "model.json")) {
        //         getDownloadURL(fileRef)
        //             .then(url => updateDoc(docRef, { model: url }));
        //     }
        //     else if (strStartsWith(file.name, "metadata.json")) {
        //         getDownloadURL(fileRef)
        //             .then(url => updateDoc(docRef, { metadata: url }));
        //     }
        // }

        // uploadBytes(modelRef, model).then((snapshot) => {
        //     console.log(snapshot);
        //     getDownloadURL(modelRef)
        //         .then(url => updateDoc(docRef, { model: url }));
        // });
    };

    const onModify = (id) => {
        console.log(id);
    };

    const onDelete = (id) => {
        console.log(id);
    };

    // const onOpen = (id) => setOpen(id);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const onReset = () => {
        setName("");
        setCover(undefined);
        setModel(undefined);
        setDescription("");
        setUploading(false);
        onClose();
    };

    const onSubmit = () => {
        console.log("submit");
        setUploading(true);
        onUpload()
            .then(() => {
                setName("");
                setCover(undefined);
                setModel(undefined);
                setDescription("");
                onClose();
                setUploading(false);
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
                                <FormField label="모델 URL" name="modelUrl" required error={isEmptyStr(modelUrl) ? "필수 항목입니다." : undefined}>
                                    <TextInput name="modelUrl" value={modelUrl} onChange={(event) => setModelUrl(event.target.value)} />
                                </FormField>
                                {/*<FormField label="모델 파일 및 메타데이터" name="model">*/}
                                {/*    <FileInput*/}
                                {/*        multiple*/}
                                {/*        accept=".bin, .json"*/}
                                {/*        messages={{*/}
                                {/*            browse: "선택",*/}
                                {/*            dropPromptMultiple: "파일을 여기에 드래그 하세요.",*/}
                                {/*            files: "파일 목록",*/}
                                {/*            remove: "삭제",*/}
                                {/*            removeAll: "모두 삭제",*/}
                                {/*        }}*/}
                                {/*        onChange={({ target: { files } }) => {*/}
                                {/*            let temp = [];*/}
                                {/*            for (let i = 0; i < files.length; i++) {*/}
                                {/*                temp.push(files[i]);*/}
                                {/*            }*/}
                                {/*            setModel(temp);*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</FormField>*/}
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
                    <CardBody fill="vertical">
                        <Box pad="medium">
                            <List data={models}
                                  pad={{ left: "small", right: "none" }}
                                  action={(item, index) => (
                                      <Menu key={index} icon={<More />}
                                            items={[
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
                        </Box>
                    </CardBody>
                    <CardFooter>
                        <Box as="footer" gap="small" direction="row" align="center" justify="end"
                             pad={{ top: "medium", bottom: "small" }}
                        >
                            <Button
                                label={
                                    <Text color="white">
                                        <strong>등록하기</strong>
                                    </Text>
                                }
                                onClick={onOpen}
                                primary
                            />
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
        </>
    );

}
