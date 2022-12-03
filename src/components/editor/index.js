import React from "react";

import { Layer, Box, Text, Button, TextArea } from "grommet";
import {
    TbCirclePlus, TbPhoto, TbHandClick, TbHeading, TbLetterT, TbLayoutDistributeHorizontal
} from "react-icons/tb";

// const Aligns = (
//     <Box pad={"small"} direction={"row"} gap={"small"}>
//         <Text size={"small"}>A</Text>
//     </Box>
// );

function auto_grow(compRef) {
    compRef.current.style.height = "42px";
    compRef.current.style.height = (compRef.current.scrollHeight)+"px";
}

export default function Editor() {

    const ref = React.useRef(null);
    const nextId = React.useRef(1);

    const [ contextMenuOpen, setContextMenuOpen ] = React.useState(false);

    const onContextMenuOpen = () => setContextMenuOpen(true);
    const onContextMenuClose = () => setContextMenuOpen(false);

    const [ children, setChildren ] = React.useState([]);

    const onChangeAlign = (compRef) => {
        // const element = document.getElementById(id);
        console.log(compRef.current);
        compRef.current.style.alignSelf = "center";
    };

    const addImage = () => {
        let newChildren = children;
        const newRef = React.createRef();
        newChildren.push({
            key: nextId,
            ref: newRef,
            component: (
                <Box key={nextId.current} ref={newRef} className={"disabled-focus"} onClick={() => onChangeAlign(newRef)}>
                    <Text size={"small"}>Inserted</Text>
                </Box>
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
                          size={"small"} style={{ width: "100%", height: 42, border: "1px dashed #ff5a01" }}
                          onInput={() => auto_grow(newRef)}
                          onBlur={() => console.log("done")}
                />
            )
        });
        setChildren(newChildren);
        onContextMenuClose();
        nextId.current += 1;
    };

    return (
        <Box round={"medium"} pad={"medium"} flex background={"background-front"} overflow={"scroll"} ref={ref}>
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
                            <Button icon={<TbPhoto />} hoverIndicator onClick={() => addImage()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHandClick />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHeading />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLetterT />} hoverIndicator onClick={() => addParagraph()} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLayoutDistributeHorizontal />} hoverIndicator onClick={() => {}} />
                        </Box>
                    </Box>
                </Layer>
            }
            { children.map((child, index) => child.component) }
            <Box id={"placeholder"} width={"100%"} flex align={"center"} justify={"center"} className={"disabled-focus"}
                 onClick={onContextMenuOpen}
            >
                <Box direction={"row"} gap={"xsmall"}>
                    <TbCirclePlus color={"#999999"} />
                    <Text size={"small"} color={"text-xweak"}> 클릭하여 내용을 추가해 주세요.</Text>
                </Box>
            </Box>
        </Box>
    );

}
