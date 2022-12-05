import React from "react";

import { Box, Button, Keyboard, Text, TextInput } from "grommet";
import { FormClose } from "grommet-icons";

const Tag = ({ children, onRemove, height, ...rest }) => {
    const tag = (
        <Box
            direction={"row"}
            align={"center"}
            background={"brand"}
            pad={{ horizontal: "10px" }}
            round={"medium"}
            style={{ marginTop: 12, height: height }}
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

export default function TagInput({ value = [], onAdd, onChange, onRemove, pad = 11, ...rest }) {

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
        <Tag key={`${v}${index}`} onRemove={() => onRemove(v)} height={21 + pad * 2}>
            { v }
        </Tag>
    ));

    return (
        <Keyboard onEnter={onEnter}>
            <Box direction={"row"} align={"center"} ref={boxRef} wrap style={{ marginTop: -12 }}>
                { value.length > 0 && renderValue() }
                <Box flex style={{ minWidth: "120px", marginTop: 12 }}>
                    <TextInput plain {...rest} onChange={updateCurrentTag} value={currentTag}
                               style={{ padding: `${pad}px 17px`, fontSize: 14, border: "1px solid #1c1d24" }}
                    />
                </Box>
            </Box>
        </Keyboard>
    );

}
