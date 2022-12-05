import React from "react";

import { Layer, Box, Text, Button, FileInput, TextArea, Image, TextInput } from "grommet";
import {
    TbCirclePlus, TbPhoto, TbHandClick, TbHeading, TbLetterT, TbLayoutDistributeHorizontal
} from "react-icons/tb";

// const Aligns = (
//     <Box pad={"small"} direction={"row"} gap={"small"}>
//         <Text size={"small"}>A</Text>
//     </Box>
// );

function auto_grow(compRef, initHeight) {
    compRef.current.style.height = `${initHeight}px`;
    compRef.current.style.height = (compRef.current.scrollHeight)+"px";
}

export default function Editor() {

    const ref = React.useRef(null);
    const nextId = React.useRef(1);

    const [ contextMenuOpen, setContextMenuOpen ] = React.useState(false);

    const onContextMenuOpen = () => setContextMenuOpen(true);
    const onContextMenuClose = () => setContextMenuOpen(false);

    const [ children, setChildren ] = React.useState([]);

    const [ imageUploadOpen, setImageUploadOpen ] = React.useState(false);
    const onImageUploadClose = () => setImageUploadOpen(false);

    const [ buttonLabel, setButtonLabel ] = React.useState(undefined);
    // eslint-disable-next-line no-unused-vars
    const [ buttonLink, setButtonLink ] = React.useState(undefined);
    const [ buttonMenuOpen, setButtonMenuOpen ] = React.useState(false);
    const onButtonMenuClose = () => setButtonMenuOpen(false);

    // const onChangeAlign = (compRef) => {
    //     // const element = document.getElementById(id);
    //     console.log(compRef.current);
    //     compRef.current.style.alignSelf = "center";
    // };

    const openImageUpload = () => {
        onContextMenuClose();
        setImageUploadOpen(true);
    };

    const addImage = (file) => {
        // TODO : Upload image file to firebase
        let reader = new FileReader();
        reader.onloadend = () => {
            const imageSource = reader.result;

            let newChildren = children;
            const newRef = React.createRef();
            newChildren.push({
                key: nextId,
                ref: newRef,
                component: (
                    <Box key={nextId.current} ref={newRef}
                         margin={{ vertical: "xsmall" }}
                         round={"medium"} overflow={"hidden"}
                    >
                        <Image style={{ borderRadius: 24 }}
                               src={imageSource}
                               fill={"horizontal"}
                            // fit={"contain"}
                        />
                    </Box>
                )
            });
            setChildren(newChildren);
            onImageUploadClose();
            nextId.current += 1;
        };
        reader.readAsDataURL(file);
    };

    const addHeading = () => {
        let newChildren = children;
        const newRef = React.createRef();
        newChildren.push({
            key: nextId,
            ref: newRef,
            component: (
                <TextArea key={nextId.current} ref={newRef}
                          size={"large"} style={{ color: "#eeeeee", fontSize: 18, width: "100%", height: 50, marginTop: 6 }}
                          placeholder={"내용을 입력하세요."}
                          onInput={() => auto_grow(newRef, 50)}
                          onBlur={() => console.log("done")}
                />
            )
        });
        setChildren(newChildren);
        onContextMenuClose();
        nextId.current += 1;
    };

    const addParagraph = () => {
        let newChildren = children;
        const newRef = React.createRef();
        newChildren.push({
            key: nextId,
            ref: newRef,
            component: (
                <TextArea key={nextId.current} ref={newRef}
                          size={"small"} style={{ width: "100%", fontSize: 12, height: 42, marginTop: 6 }}
                          placeholder={"내용을 입력하세요."}
                          onInput={() => auto_grow(newRef, 42)}
                          onBlur={() => console.log("done")}
                />
            )
        });
        setChildren(newChildren);
        onContextMenuClose();
        nextId.current += 1;
    };

    const openButtonMenu = () => {
        onContextMenuClose();
        setButtonMenuOpen(true);
    };

    const addButton = () => {
        let newChildren = children;
        const newRef = React.createRef();
        newChildren.push({
            key: nextId,
            ref: newRef,
            component: (
                <Box key={nextId.current} ref={newRef}
                     margin={{ vertical: "xsmall" }}
                     round={"medium"} align={"center"}
                >
                    <Button primary label={<Text color={"#eeeeee"} size={"small"}>{buttonLabel}</Text>}
                            // onClick={() => window.open(buttonLink, '_blank', 'noopener,noreferrer')}
                    />
                </Box>
            )
        });
        setChildren(newChildren);
        onButtonMenuClose();
        setButtonLabel(undefined);
        setButtonLink(undefined);
        nextId.current += 1;
    };

    const addHorizontalLine = () => {
        let newChildren = children;
        const newRef = React.createRef();
        newChildren.push({
            key: nextId,
            ref: newRef,
            component: (
                <Box key={nextId.current} ref={newRef}
                     height={"1px"}
                     margin={{ vertical: "small" }}
                     round={"medium"} overflow={"hidden"}
                     background={"brand"}
                />
            )
        });
        setChildren(newChildren);
        onContextMenuClose();
        nextId.current += 1;
    };

    return (
        <Box round={"medium"} pad={{ vertical: "small", horizontal: "medium" }} align={"start"} background={"background-front"} overflow={"scroll"} ref={ref}
             style={{ display: "block", height: "100%" }}
        >
            { contextMenuOpen &&
                <Layer position={"center"} background={"background"}
                       target={ref.current}
                       style={{ alignSelf: "center", borderRadius: 24 }}
                       onClickOutside={onContextMenuClose} onEsc={onContextMenuClose}
                       modal
                       responsive
                >
                    <Box alignSelf={"center"} pad={{ vertical: "small", horizontal: "medium" }} direction={"row"} gap={"xsmall"}>
                        {/*<Box round={"medium"} overflow={"hidden"}>*/}
                        {/*    <Button icon={<TbLayoutColumns />} hoverIndicator onClick={() => {}} />*/}
                        {/*</Box>*/}
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbPhoto />} hoverIndicator onClick={() => openImageUpload()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHandClick />} hoverIndicator onClick={() => openButtonMenu()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHeading />} hoverIndicator onClick={() => addHeading()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLetterT />} hoverIndicator onClick={() => addParagraph()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLayoutDistributeHorizontal />} hoverIndicator onClick={() => addHorizontalLine()} />
                        </Box>
                    </Box>
                </Layer>
            }
            { imageUploadOpen &&
                <Layer position={"center"} background={"background"}
                       target={ref.current}
                       style={{ width: "100%", height: 120, alignSelf: "center", borderRadius: 24 }}
                       onClickOutside={onImageUploadClose} onEsc={onImageUploadClose}
                       modal
                       responsive
                >
                    <FileInput
                        accept="image/*"
                        messages={{
                            browse: "선택",
                            dropPrompt: "이미지 파일을 여기에 드래그 하세요.",
                            remove: "삭제",
                        }}
                        onChange={(event, { files }) => {
                            addImage(files[0]);
                        }}
                    />
                </Layer>
            }
            { buttonMenuOpen &&
                <Layer position={"center"} background={"background"}
                       target={ref.current}
                       style={{ alignSelf: "center", borderRadius: 24 }}
                       onClickOutside={onButtonMenuClose} onEsc={onButtonMenuClose}
                       modal
                       responsive
                >
                    <Box width={"360px"} gap={"small"} pad={"medium"} round={"medium"} border={{ color: "background-front", size: "xsmall" }}>
                        <TextInput size={"small"} placeholder={"버튼 레이블"} onChange={e => setButtonLabel(e.target.value)} />
                        <TextInput size={"small"} placeholder={"버튼 링크 URL"} onChange={e => setButtonLink(e.target.value)} />
                        <Box align={"center"}>
                            <Button primary label={<Text color={"#eeeeee"} size={"small"}>등록</Text>} onClick={() => addButton()} />
                        </Box>
                    </Box>
                </Layer>
            }
            { children.map((child, index) => child.component) }
            <Box width={"100%"} pad={"medium"} margin={{ vertical: "small" }} align={"center"} justify={"center"} round={"medium"}
                 className={"disabled-focus"} border={{ size: "xsmall", color: "text-weak", style: "dashed" }}
                 onClick={onContextMenuOpen}
            >
                <Box direction={"row"} gap={"xsmall"}>
                    <TbCirclePlus color={"#999999"} />
                    <Text size={"12px"} color={"text-xweak"}> 클릭하여 내용을 추가해 주세요.</Text>
                </Box>
            </Box>
        </Box>
    );

}
