import React from "react";

import { Box, Image, Button, Text, Layer, FileInput, TextArea, Avatar } from "grommet";
import { TbHandClick, TbMessage2, TbThumbUp, TbX, TbSend, TbDotsVertical } from "react-icons/tb";
import parse from "html-react-parser";

import { utcDateTime, toShortDateTime } from "../../../utils/datetime";
import { strReplace } from "../../../utils/strings";
import { numberToString } from "../../../utils/numbers";

import { CURRENT_USER } from "../../../temp/data";

function auto_grow(compRef) {
    compRef.current.style.height = "42px";
    compRef.current.style.height = (compRef.current.scrollHeight)+"px";
}

export default function AppLayer({ item, onClose }) {

    const ref = React.useRef(null);
    const textAreaRef = React.useRef(null);

    const [ data, setData ] = React.useState({ ...item, comments: [] });
    const [ file, setFile ] = React.useState(undefined);

    const [ comment, setComment ] = React.useState("");
    const [ openComments, setOpenComments ] = React.useState(false);

    const openCommentsLayer = () => setOpenComments(true);
    const closeCommentsLayer = () => {
        setOpenComments(false);
        setComment("");
    };

    const addComment = () => {
        const newComments = [{
            comment: strReplace(comment, "\n", "<br/>"),
            datetime: utcDateTime(),
            user: CURRENT_USER,
        }, ...data.comments ];

        setComment("");
        textAreaRef.current.style.height = "42px";
        setData({ ...data, commentCount: newComments.length, comments: newComments });
    };

    const [ like, setLike ] = React.useState(false);
    const onLike = () => {
        if (!like) {
            setData({ ...data, likeCount: data.likeCount + 1 });
        } else {
            setData({ ...data, likeCount: data.likeCount - 1 });
        }
        setLike(!like);
    };

    return (
        <Box width={"xlarge"} pad={"medium"} direction={"row"} ref={ref}>
            { openComments &&
                <Layer position={"bottom"} background={"background-back"}
                       // margin={{ bottom: "72px" }}
                       target={ref.current}
                       onClickOutside={closeCommentsLayer} onEsc={closeCommentsLayer}
                       style={{ width: "100%", maxHeight: 704, borderRadius: 24 }}
                       modal
                       responsive
                >
                    <Box flex pad={{ horizontal: "medium", vertical: "24px" }} gap={"medium"}>
                        <Box direction={"row"} gap={"small"} align={"center"} pad={{ horizontal: "small", vertical: "16px" }}
                             background={"background-front"} round={"medium"}
                        >
                            <TextArea size={"small"} placeholder={"댓글을 입력하세요"}
                                      value={comment}
                                      ref={textAreaRef}
                                      style={{ height: 42 }}
                                      onInput={() => auto_grow(textAreaRef)}
                                      onChange={(event) => setComment(event.target.value)}
                            />
                            <Box round={"small"} width={"32px"} height={"32px"} align={"center"} justify={"center"} overflow={"hidden"} background={"brand"}>
                                <Button size={"small"} icon={<TbSend color={"#eeeeee"} />} onClick={() => addComment()} />
                            </Box>
                        </Box>
                        { data.comments.length === 0 &&
                            <Box pad={{ vertical: "small", horizontal: "medium" }} round={"medium"} style={{ border: "1px solid #1c1d24" }}>
                                <Text size={"small"} color={"text-xweak"}>
                                    댓글이 없습니다.
                                </Text>
                            </Box>
                        }
                        { data.comments.length > 0 &&
                            <Box gap={"small"}>
                                { data.comments.map((comment, index) =>
                                    <Box key={index} direction={"row"} gap={"small"} background={"background-front"} pad={"medium"} round={"medium"}>
                                        <Avatar src={comment.user.avatar} size={"32px"} />
                                        <Box flex gap={"xsmall"}>
                                            <Box direction={"row"} align={"center"} gap={"small"}>
                                                <Text size={"small"} weight={"bolder"}>
                                                    { comment.user.name }
                                                </Text>
                                                <Text size={"xsmall"} color={"text-weak"}>
                                                    { toShortDateTime(comment.datetime) }
                                                </Text>
                                            </Box>
                                            <Text size={"small"} truncate>
                                                { parse(comment.comment) }
                                            </Text>
                                        </Box>
                                        <Box round={"small"} width={"32px"} height={"32px"}
                                             align={"center"} justify={"center"} overflow={"hidden"}
                                        >
                                            <Button size={"small"} icon={<TbDotsVertical color={"#eeeeee"} />} onClick={() => {}} />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        }
                    </Box>
                </Layer>
            }
            <Box width={"48%"} gap={"16px"} justify={"between"} style={{ minHeight: 800 }}>
                <Box className="overlay-container">
                    <Image fit="cover" fill className="layer-cover-image"
                           src={data.cover}
                    />
                    <Box className="text-overlay-top">
                        <Text size={"xsmall"}>
                            { data.type }
                        </Text>
                    </Box>
                </Box>
                <Box flex gap={"medium"} align={"start"} justify={"between"}>
                    <Box direction={"row"} gap={"small"} pad={{ horizontal: "small" }}>
                        { data.tags.map((tag, index) =>
                            <Box key={index} pad={{ horizontal: "small", vertical: "4px" }} round={"medium"} style={{ border: "1px solid #ff5a01" }}>
                                <Text size={"xsmall"} color={"#eeeeee"} weight={"bolder"}>
                                    { tag }
                                </Text>
                            </Box>
                        )}
                    </Box>
                    <Box pad={{ horizontal: "small" }} direction={"row"} gap={"small"}>
                        <Button size={"small"} secondary
                                icon={<TbHandClick size={14} color={"#eeeeee"} style={{ marginTop: -2 }} />}
                                label={
                                    <Text size={"xsmall"} color={"#eeeeee"} style={{ marginLeft: -5 }}>
                                        { numberToString(data.playCount) }
                                    </Text>
                                }
                                style={{ borderWidth: 1, padding: "4px 12px" }}
                                className="disabled-pointer"
                        />
                        <Button size={"small"}
                                primary={!like} secondary={like}
                                icon={<TbThumbUp size={15} color={"#eeeeee"} />}
                                label={
                                    <Text size={"xsmall"} color={"#eeeeee"} color={"#eeeeee"} style={{ marginLeft: -5 }}>
                                        { numberToString(data.likeCount) }
                                    </Text>
                                }
                                style={{ borderWidth: 1, padding: "4px 12px" }}
                                onClick={() => onLike()}
                        />
                        <Button size={"small"} primary
                                icon={<TbMessage2 size={15} color={"#eeeeee"} style={{ marginTop: -1 }} />}
                                label={
                                    <Text size={"xsmall"} color={"#eeeeee"} style={{ marginLeft: -5 }}>
                                        { numberToString(data.commentCount) }
                                    </Text>
                                }
                                style={{ borderWidth: 1, padding: "4px 12px" }}
                                onClick={() => openCommentsLayer()}
                        />
                    </Box>
                </Box>
            </Box>
            <Box width={"52%"} gap={"small"}>
                <Box direction={"row"} pad={{ vertical: "xsmall", left: "medium" }} justify={"between"}>
                    <Text size={"large"} weight={"bold"} style={{ marginLeft: 8 }}>
                        { data.name }
                    </Text>
                    <Box round={"small"} width={"32px"} height={"32px"} align={"center"} justify={"center"} overflow={"hidden"} background={"brand"}>
                        <Button size={"small"} icon={<TbX color={"#eeeeee"} />} onClick={() => onClose()} />
                    </Box>
                </Box>
                <Box flex pad={{ top: "xsmall", left: "medium" }} gap={"small"}>
                    <Box height={"180px"}>
                        <FileInput
                            accept="image/*"
                            messages={{
                                browse: "선택",
                                dropPrompt: "이미지 파일을 여기에 드래그 하세요.",
                                remove: "삭제",
                            }}
                            onChange={(event, { files }) => {
                                setFile(files[0]);
                            }}
                        />
                    </Box>
                    <Box flex margin={{ top: "small" }} pad={"medium"}
                         background={"background-front"} round={"medium"}
                         overflow={"scroll"}
                    >
                        { data.description }
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}
