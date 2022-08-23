import React from "react";
import {
    Box, Button, FileInput, Form, FormField, Heading, Layer, Spinner, Text, TextInput
} from "grommet";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "../../../config/firebase";
import { ImageUploadAdaptor } from "./ImageUploadAdaptor";
import { isEmptyStr } from "../../../utils/strings";
import { utcDateTime } from "../../../utils/datetime";

export default function UploadTMModel({ uid, onRefresh, onClose }) {

    const [ uploading, setUploading ] = React.useState(false);
    const [ name, setName ] = React.useState("");
    const [ cover, setCover ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState("");
    const [ description, setDescription ] = React.useState("");
    const [ labels, setLabels ] = React.useState([]);
    const [ metadataLoading, setMetadataLoading ] = React.useState(false);
    const [ modelError, setModelError ] = React.useState("필수 항목입니다.");

    const testUrl = (event) => {
        const url = event.target.value;
        setModelUrl(url);
        if (isEmptyStr(url)) {
            setModelError("필수 항목입니다.");
        }
        else if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/.test(url)) {
            setModelError(undefined);
            readMetadata(url);
        }
        else {
            setModelError("잘못된 경로 입니다.");
        }
    };

    const readMetadata = (url) => {
        setMetadataLoading(true);

        axios({
            method: "get",
            url: `${url}metadata.json`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setName(response.data.modelName);
                let tmp = [];
                response.data.labels.forEach(label => {
                    tmp.push({
                        name: label,
                        description: "",
                    });
                });
                setLabels(tmp);
            })
            .catch(error => {
                console.error(error);
                setModelError("잘못된 경로입니다.");
            })
            .finally(() => setMetadataLoading(false));
    };

    const submit = async () => {
        if (cover !== null && cover !== undefined) {
            setUploading(true);

            const coverRef = ref(storage, `${uid}/images/${cover.name}`);
            await uploadBytes(coverRef, cover);
            const url = await getDownloadURL(coverRef);

            await addDoc(collection(db, "models"), {
                name: name,
                cover: url,
                modelUrl: modelUrl,
                description: description,
                labels: labels,
                uid: uid,
                testCount: 0,
                bookmarked: [],
                datetime: utcDateTime(),
            });

            setUploading(false);
            onRefresh();
        }
    };

    const reset = () => {
        onClose();
    };

    return (
        <Box pad="medium" gap="small" width="xlarge" flex={true} overflow="scroll">
            { metadataLoading &&
                <Layer>
                    <Box align="center" justify="center" gap="small" direction="row" alignSelf="center" pad="large">
                        <Spinner />
                        <Text>로딩중...</Text>
                    </Box>
                </Layer>
            }
            <Heading level={3} margin={{ bottom: "small" }}>
                공유하기
            </Heading>
            <Form onSubmit={submit} onReset={reset}>
                <FormField label="모델 URL" name="modelUrl" required error={modelError} onChange={testUrl}>
                    <TextInput name="modelUrl" value={modelUrl} onChange={testUrl} />
                </FormField>
                <FormField label="모델명" name="name" required error={isEmptyStr(name) ? "필수 항목입니다." : undefined}>
                    <TextInput name="name" value={name} onChange={(event) => setName(event.target.value)} />
                </FormField>
                <FormField label="대표 이미지" name="cover">
                    <FileInput
                        accept="image/*"
                        messages={{
                            browse: "선택",
                            dropPrompt: "이미지 파일을 여기에 드래그 하세요.",
                            remove: "삭제",
                        }}
                        onChange={(event, { files }) => {
                            setCover(files[0]);
                        }}
                    />
                </FormField>
                <FormField label="모델 설명">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={description}
                        onReady={ editor => {
                            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                return new ImageUploadAdaptor(loader, uid);
                            };
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setDescription(data);
                        } }
                    />
                </FormField>
                { labels.length > 0 &&
                    <Box margin={{ top: "medium" }}>
                        <Text margin={{ bottom: "xsmall" }}>클래스 출력 결과 페이지 작성</Text>
                        { labels.map((label, index) =>
                            <Box key={index} margin={{ vertical: "small" }}>
                                <Text margin={{ bottom: "small",  horizontal: "xsmall" }}>
                                    { label.name }
                                </Text>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={label.description}
                                    onReady={ editor => {
                                        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                            return new ImageUploadAdaptor(loader, uid);
                                        };
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setLabels(prevState => {
                                            return prevState.map((obj, i) => {
                                                if (i === index) {
                                                    return {...obj, description: data};
                                                }
                                                return obj;
                                            });
                                        });
                                    } }
                                />
                            </Box>
                        )}
                    </Box>
                }
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
                        type="button"
                        disabled={uploading}
                        onClick={submit}
                        primary
                    />
                </Box>
            </Form>
        </Box>
    );

}
