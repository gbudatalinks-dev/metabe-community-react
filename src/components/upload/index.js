import React from "react";

import {
    Box, FileInput, Select, TextInput, Tabs, Tab, Button, Keyboard, Text, Layer, Spinner
} from "grommet";
import { FormClose } from 'grommet-icons';
import { TbCloudUpload, TbX, TbId } from "react-icons/tb";

import axios from "axios";

import Editor from "../editor";
import { isEmptyStr } from "../../utils/strings";

const TYPES = ["IMAGE", "POSE"];

const Tag = ({ children, onRemove, ...rest }) => {
    const tag = (
        <Box
            direction={"row"}
            align={"center"}
            background={"brand"}
            pad={{ horizontal: "10px" }}
            round={"medium"}
            style={{ marginTop: 12, height: 43 }}
            {...rest}
        >
            <Text size={"13px"} color={"#eeeeee"} margin={{ horizontal: "xsmall" }}>
                { children }
            </Text>
            { onRemove && <FormClose size={"small"} color={"white"} /> }
        </Box>
    );

    if (onRemove) {
        return <Button onClick={onRemove} margin={{ bottom: "none", right: "xsmall" }}>{tag}</Button>;
    }

    return tag;
};

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
    const [ currentTag, setCurrentTag ] = React.useState("");
    const boxRef = React.useRef();

    const updateCurrentTag = (event) => {
        setCurrentTag(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    const onAddTag = (tag) => {
        if (onAdd) {
            onAdd(tag);
        }
    };

    const onEnter = () => {
        if (currentTag.length) {
            onAddTag(currentTag);
            setCurrentTag("");
        }
    };

    const renderValue = () => value.map((v, index) => (
        <Tag key={`${v}${index + 0}`} onRemove={() => onRemove(v)}>
            { v }
        </Tag>
    ));

    return (
        <Keyboard onEnter={onEnter}>
            <Box direction={"row"} align={"center"} ref={boxRef} wrap style={{ marginTop: -12 }}>
                { value.length > 0 && renderValue() }
                <Box flex style={{ minWidth: "120px", marginTop: 12 }}>
                    <TextInput plain {...rest} onChange={updateCurrentTag} value={currentTag}
                               style={{ padding: "11px 17px", fontSize: 14, border: "1px solid #1c1d24" }}
                    />
                </Box>
            </Box>
        </Keyboard>
    );
};

export default function UploadApp({ onClose }) {

    const [ uploading, setUploading ] = React.useState(false);
    const [ type, setType ] = React.useState(TYPES[0]);
    const [ name, setName ] = React.useState("");
    const [ cover, setCover ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState("");
    const [ tags, setTags ] = React.useState([]);
    const [ description, setDescription ] = React.useState("");
    const [ labels, setLabels ] = React.useState([]);
    const [ metadataLoading, setMetadataLoading ] = React.useState(false);

    const [ tabIndex, setTabIndex ]= React.useState(0);
    const onActive = (nextIndex) => setTabIndex(nextIndex);

    const testUrl = (event) => {
        const url = event.target.value;
        setModelUrl(url);
        if (isEmptyStr(url)) {
            // setModelError("필수 항목입니다.");
        }
        else if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/.test(url)) {
            // setModelError(undefined);
            readMetadata(url);
        }
        else {
            // setModelError("잘못된 경로 입니다.");
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
                // setModelError("잘못된 경로입니다.");
            })
            .finally(() => setMetadataLoading(false));
    };

    const onRemoveTag = (tag) => {
        const removeIndex = tags.indexOf(tag);
        const newTags = [...tags];
        if (removeIndex >= 0) {
            newTags.splice(removeIndex, 1);
        }
        setTags(newTags);
    };

    const onAddTag = (tag) => setTags([...tags, tag]);

    const onChangeLabelName = (index, value) => {};

    return (
        <Box width={"xlarge"} pad={"medium" } gap={"medium"}>
            { metadataLoading &&
                <Layer>
                    <Box align={"center"} justify={"center"} alignSelf={"center"}
                         direction={"row"} gap={"small"} pad={"large"}
                         background={"background-contrast"} round={"medium"}
                    >
                        <Spinner />
                        <Text size={"small"}>처리 중</Text>
                    </Box>
                </Layer>
            }
            <Box justify={"between"} direction={"row"} align={"center"}>
                <Tabs activeIndex={tabIndex} onActive={onActive} justify="start">
                    <Tab title={"기본 정보 작성"} />
                    <Tab title={"결과 페이지 작성"} />
                </Tabs>
                <Box round={"small"} width={"32px"} height={"32px"} align={"center"} justify={"center"} overflow={"hidden"} background={"brand"}>
                    <Button size={"small"} icon={<TbX color={"#eeeeee"} />} onClick={() => onClose()} />
                </Box>
            </Box>
            { tabIndex === 0 &&
                <Box direction={"row"} gap={"medium"}>
                    <Box width={"50%"} gap={"small"}>
                        <Box height={"120px"}>
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
                        </Box>
                        <Select value={type} options={TYPES} onChange={({ option }) => setType(option)}
                                style={{ fontSize: 14 }}
                        />
                        <TextInput name="name" placeholder={"앱 이름"} value={name} onChange={(event) => setName(event.target.value)}
                                   style={{ padding: "11px 17px", fontSize: 14, }}
                        />
                        <TextInput name="model" placeholder={"모델 URL"} value={modelUrl} onChange={testUrl}
                                   style={{ padding: "11px 17px", fontSize: 14, }}
                        />
                        <TagInput placeholder="태그" value={tags} onRemove={onRemoveTag} onAdd={onAddTag} />
                    </Box>
                    <Box width={"50%"} height={"600px"} gap={"small"}>
                        <Editor />
                    </Box>
                </Box>
            }
            { tabIndex === 1 &&
                <Box direction={"row"} gap={"medium"}>
                    { labels.map((label, index) =>
                        <Box width={`${100 / labels.length }%`} height={"600px"} key={index} align={"center"} gap={"small"}>
                            <TextInput name={`label-${index}`} value={label.name}
                                       icon={<TbId color={"#cccccc"} style={{ marginLeft: 6 }} />}
                                       style={{ fontSize: 14, }}
                                       onChange={(event) => onChangeLabelName(index, event.target.value)}
                            />
                            <Box width={"100%"} height={"543px"}>
                                <Editor />
                            </Box>
                        </Box>
                    )}
                </Box>
            }
            <Box align={"end"}>
                { tabIndex === 0 &&
                    <Button primary size={"small"} alignSelf={"end"} label={"다음"} style={{ fontWeight: "bolder", color: "#eeeeee" }}
                            onClick={() => onActive(1)}
                    />
                }
                { tabIndex === 1 &&
                    <Box width={"100%"} justify={"between"} direction={"row"}>
                        <Button size={"small"} label={"이전"} style={{ fontWeight: "bolder", color: "#eeeeee" }}
                                onClick={() => onActive(0)}
                        />
                        <Button primary size={"small"}
                                icon={<TbCloudUpload color={"#eeeeee"} size={"18px"} style={{ marginTop: -2 }} />}
                                label={"업로드"}
                                style={{ fontWeight: "bolder", color: "#eeeeee" }}
                        />
                    </Box>
                }
            </Box>
        </Box>
    );

}
