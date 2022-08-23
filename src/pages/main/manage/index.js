import React from "react";

import {
    Box, Card, CardHeader, CardBody, CardFooter, Heading, List, Menu, Layer, Button, Text
} from "grommet";
import { More } from "grommet-icons";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppContext } from "../../../context";

import UploadTMModel from "./UploadTMModel";

export default function Manage() {

    const [ models, setModels ] = React.useState([]);
    // const [ cloudModels, setCloudModels ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    // const [ isLoadedFromCloud, setIsLoadedFromCloud ] = React.useState(false);

    const { globalState } = React.useContext(AppContext);

    React.useEffect(() => {
        onLoad()
            .then(result => setModels(result));
        // eslint-disable-next-line
    }, [globalState.user.uid]);

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

    // const onLoadFromCloud = async () => {
    //     const token = sessionStorage.getItem("GoogleAccessToken");
    //
    //     try {
    //         const jsonFiles = await axios({
    //             method: "get",
    //             url: "https://www.googleapis.com/drive/v3/files",
    //             headers: {"Authorization" : "Bearer " + token,
    //                 "Content-Type" : "application/json"},
    //             params: {
    //                 "q": "mimeType = 'application/json'",
    //                 "fields": 'files(name, id)',
    //                 "spaces": 'drive',
    //             },
    //         });
    //
    //         setCloudModels(jsonFiles.data.files);
    //
    //         const weightFiles = await axios({
    //             method: "get",
    //             url: "https://www.googleapis.com/drive/v3/files",
    //             headers: {"Authorization" : "Bearer " + token,
    //                 "Content-Type" : "application/json"},
    //             params: {
    //                 "q": "name contains 'weights.bin'",
    //                 "fields": 'files(name, id)',
    //                 "spaces": 'drive',
    //             },
    //         });
    //
    //         setModelWeightsFiles(weightFiles.data.files);
    //         setIsLoadedFromCloud(true);
    //
    //     } catch(error) {
    //         console.log(error);
    //     }
    // };

    // const onUpload = async () => {
    //     const modelUri = isTM ? `models/${globalState.user.uid}/tm_${new Date().getTime()}` : `models/${globalState.user.uid}/${modelJsonFile.id}`;
    //
    //     const data = isTM ? {
    //         name: name,
    //         uid: globalState.user.uid,
    //         description: description,
    //         modelUrl: modelUrl,
    //     } : {
    //         name: name,
    //         uid: globalState.user.uid,
    //         description: description,
    //         modelId: modelJsonFile.id,
    //     };
    //
    //     const docRef = await addDoc(collection(db, "models"), data);
    //
    //     // Cover Upload
    //     const coverRef = ref(storage, `${modelUri}/cover${getExtension(cover.name)}`);
    //     uploadBytes(coverRef, cover).then((snapshot) => {
    //         getDownloadURL(coverRef)
    //             .then(url => updateDoc(docRef, { cover: url }));
    //     });
    //
    //     if (isTM === false) {
    //         // Model Upload from Google Cloud
    //         const fileName = modelJsonFile.name.split('.')[0];
    //         const weightFile = modelWeightFiles.filter(f => f.name === `${fileName}.weights.bin`)[0];
    //
    //         const modelJsonFileRef = ref(storage, `${modelUri}/model/model.json`);
    //         const modelWeightFileRef = ref(storage, `${modelUri}/model/model.weights.bin`);
    //
    //         const token = sessionStorage.getItem("GoogleAccessToken");
    //         let response;
    //
    //         try {
    //             response = await axios({
    //                 method: "get",
    //                 url: "https://www.googleapis.com/drive/v3/files/" + modelJsonFile.id + "",
    //                 headers: {"Authorization" : "Bearer " + token,
    //                     "Content-Type" : "application/json"},
    //                 params: {
    //                     "alt": 'media',
    //                 },
    //                 responseType: "blob",
    //             });
    //
    //             uploadBytes(modelJsonFileRef, response.data).then((snapshot) => {
    //                 console.log('Uploaded json file!');
    //             });
    //
    //             response = await axios({
    //                 method: "get",
    //                 url: "https://www.googleapis.com/drive/v3/files/" + weightFile.id + "",
    //                 headers: {"Authorization" : "Bearer " + token,
    //                     "Content-Type" : "application/json"},
    //                 params: {
    //                     "alt": 'media',
    //                 },
    //                 responseType: "blob",
    //             });
    //
    //             uploadBytes(modelWeightFileRef, response.data).then((snapshot) => {
    //                 console.log('Uploaded bin file!');
    //             });
    //
    //         } catch(error) {
    //             console.log(error);
    //         }
    //     }
    // };

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const onRefresh = () => {
        onLoad()
            .then(result => {
                setModels(result);
                onClose();
            });
    };

    const onCreateWithTMModel = () => {
        onOpen();
    };

    const onModify = (id) => {
        console.log(id);
    };

    const onDelete = (id) => {
        console.log(id);
    };

    return (
        <>
            <Box pad="medium" background="background-back" flex={true} overflow="scroll">
                { open && (
                    <Layer position={"center"}
                           onClickOutside={onClose}
                           onEsc={onClose}
                    >
                        <UploadTMModel uid={globalState.user.uid} onRefresh={onRefresh} onClose={onClose} />
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
                        {/*{ isLoadedFromCloud &&*/}
                        {/*    <Card pad="medium" background="light-1" flex={"grow"}>*/}
                        {/*        <CardHeader margin={{ "bottom": "xsmall" }}>*/}
                        {/*            <Heading level={"3"} style={{ fontFamily: "Poppins", fontWeight: 800 }}>*/}
                        {/*                클라우드 등록 모델*/}
                        {/*            </Heading>*/}
                        {/*        </CardHeader>*/}
                        {/*        <CardBody fill="vertical">*/}
                        {/*            <List data={cloudModels}*/}
                        {/*                  pad={{ left: "small", right: "none" }}*/}
                        {/*                  action={(item, index) => (*/}
                        {/*                      <Menu key={index} icon={<More />}*/}
                        {/*                            items={[*/}
                        {/*                                { label: "수정", onClick: () => onModify(item.id) },*/}
                        {/*                                { label: "삭제", onClick: () => onDelete(item.id) }*/}
                        {/*                            ]}*/}
                        {/*                      />*/}
                        {/*                  )}*/}
                        {/*            >*/}
                        {/*                {(datum) => (*/}
                        {/*                    <Text weight="bold">{ datum.name }</Text>*/}
                        {/*                )}*/}
                        {/*            </List>*/}
                        {/*        </CardBody>*/}
                        {/*        <CardFooter>*/}
                        {/*        </CardFooter>*/}
                        {/*    </Card>*/}
                        {/*}*/}
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
                                // onClick={onLoadFromCloud}
                                primary
                                disabled={true} // TODO : To be deleted
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
