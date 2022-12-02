import React from "react";

import { Layer, Box, Text, Button } from "grommet";
import {
    TbCirclePlus, TbLayoutColumns, TbPhoto, TbHandClick, TbHeading, TbLetterT, TbLayoutDistributeHorizontal
} from "react-icons/tb";

export default function Editor() {

    const ref = React.useRef(null);

    const [ contextMenuOpen, setContextMenuOpen ] = React.useState(false);

    const onContextMenuOpen = () => setContextMenuOpen(true);
    const onContextMenuClose = () => setContextMenuOpen(false);

    return (
        <Box id={"description"} round={"large"} flex background={"background-front"} overflow={"scroll"} ref={ref}>
            { contextMenuOpen &&
                <Layer position={"center"} background={"background"}
                       target={ref.current}
                       style={{ alignSelf: "center", borderRadius: 24 }}
                       onClickOutside={onContextMenuClose} onEsc={onContextMenuClose}
                       modal
                       responsive
                >
                    <Box alignSelf={"center"} pad={{ vertical: "small", horizontal: "medium" }} direction={"row"} gap={"xsmall"}>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLayoutColumns />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbPhoto />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHandClick />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbHeading />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLetterT />} hoverIndicator onClick={() => {}} />
                        </Box>
                        <Box round={"medium"} overflow={"hidden"}>
                            <Button icon={<TbLayoutDistributeHorizontal />} hoverIndicator onClick={() => {}} />
                        </Box>
                    </Box>
                </Layer>
            }
            <Box id={"placeholder"} width={"100%"} flex align={"center"} justify={"center"} onClick={onContextMenuOpen}>
                <Box direction={"row"} gap={"xsmall"}>
                    <TbCirclePlus color={"#999999"} />
                    <Text size={"small"} color={"text-xweak"}> 클릭하여 내용을 추가해 주세요.</Text>
                </Box>
            </Box>
        </Box>
    );

}
