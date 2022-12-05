import React from "react";

import { Box, TextInput, Avatar, Stack, Text, Header, Footer, Button } from "grommet";
import { TbSearch, TbSend } from "react-icons/tb";

import PageHeader from "../../../components/header";

const users = [
    { avatar: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRjyV6aufEiVlt_Jpu7io7LcQpp-weqg-iFIn2GoR5X7jjzvHhck05_alsHCnGc4Qgt", name: "Amanda Seyfried", isMe: false, },
    { avatar: "https://img.seoul.co.kr/img/upload/2017/08/17/SSI_20170817084646_O2.jpg", name: "Thomas Cruise", isMe: false, },
    { avatar: "https://lh3.googleusercontent.com/a/AItbvml-LQvxDrF5PrgyKULh9UDPhJZmQxeouyDitXRe=s96-c", name: "Myeongkoo KANG", isMe: true, },
];

const data = [
    { user: 0, message: "Hello~~!", datetime: "11:30" },
    { user: 2, message: "Hello, Amanda", datetime: "11:32" },
    { user: 2, message: "When did you come to Korea?", datetime: "11:32" },
    { user: 0, message: "I came in yesterday.", datetime: "11:46" },
    { user: 0, message: "How have you been?", datetime: "11:46" },
    { user: 2, message: "I've been fine. And I missed you~~😍", datetime: "11:48" },
    { user: 0, message: "Would you like to join us tonight?", datetime: "11:51" },
    { user: 0, message: "We have a lot of catching up. Let's get together and talk about it.", datetime: "11:51" },
];

const MessageBox = ({ message, users, isContinuous }) => {
    const user = users[message.user];
    return (
        <Box align={user.isMe ? "end" : "start"} >
            { user.isMe === false && isContinuous === false &&
                <Box margin={{ bottom: "small" }} align={"center"} direction={"row"} gap={"xsmall"}>
                    <Avatar src={user.avatar} size={"small"} />
                    <Text size={"xsmall"} weight={"bolder"}>
                        { user.name }
                    </Text>
                </Box>
            }
                <Box background={user.isMe ? "brand" : "background-front"} pad={{ vertical: "small", horizontal: "small"}} round={"medium"} direction={"row"} align={"center"} >
                    <Text size={"small"} color={"#eeeeee"}>
                        { message.message }
                    </Text>
                </Box>
                <Text size={"xsmall"} color={ user.isMe ? "#dddddd" : "text-xweak" } alignSelf={ user.isMe ? "end" : "start" }>
                        { message.datetime }
                </Text>
            </Box>

    );
};

export default function Chats(props) {

    return (
        <Box fill>
            <PageHeader />
            <Box direction={"row"} fill>
                <Box width={"450px"} pad={{ vertical: "medium"}} margin={{ top: "small", bottom: "30px", left: "medium" }} gap={"medium"}
                     background={"background-front"} align={"center"} round={"medium"}
                >
                    <Box width={"100%"} pad={{ horizontal: "medium" }}>
                        <TextInput icon={<TbSearch color={"#cccccc"} style={{ marginLeft: 6 }} />} size={"small"}
                                   placeholder={"검색"} style={{ backgroundColor: "#0a0a0a" }}
                        />
                    </Box>
                    <Box width={"100%"} overflow={"scroll"} gap={"medium"} pad={{ horizontal: "16px", vertical: "4px" }}>
                        <Box direction={"row"} gap={"16px"} align={"center"} pad={"small"}
                             border={{ color: "border", size: "small" }} round={"medium"} background={"brand"}
                             onClick={() => {}}
                        >
                            <Stack anchor={"bottom-right"}>
                                <Box>
                                    <Box direction="row">
                                        <Avatar src={users[0].avatar} size={"44px"} />
                                        <Box pad={"2px"} />
                                    </Box>
                                    <Box pad={"2px"} />
                                </Box>
                                {/*<Avatar size={"16px"} background={"#eeeeee"}>*/}
                                {/*    <Text size={"10px"}>*/}
                                {/*        1*/}
                                {/*    </Text>*/}
                                {/*</Avatar>*/}
                            </Stack>
                            <Box flex gap={"xsmall"}>
                                <Box direction={"row"} justify={"between"}>
                                    <Box direction={"row"} gap={"small"} align={"center"}>
                                        <Text size={"xsmall"} color={"#eeeeee"} weight={"bolder"}>
                                            { users[0].name }
                                        </Text>
                                        <Avatar size={"6px"} background={"#85cf81"} />
                                    </Box>
                                    <Text size={"xsmall"} color={"#eeeeee"}>
                                        12:30
                                    </Text>
                                </Box>
                                <Text size={"xsmall"} color={"#eeeeee"}>
                                    We have a lot of catching up. Let's get together and talk about it.
                                </Text>
                            </Box>
                        </Box>
                        <Box direction={"row"} gap={"16px"} align={"center"} pad={"small"}
                             border={{ color: "#666666", size: "1px" }} round={"medium"}
                             onClick={() => {}}
                        >
                            <Stack anchor={"bottom-right"}>
                                <Box>
                                    <Box direction="row">
                                        <Avatar src={users[1].avatar} size={"44px"} />
                                        <Box pad={"2px"} />
                                    </Box>
                                    <Box pad={"2px"} />
                                </Box>
                                <Avatar size={"16px"} background={"brand"}>
                                    <Text size={"10px"} color={"#eeeeee"}>
                                        4
                                    </Text>
                                </Avatar>
                            </Stack>
                            <Box flex gap={"xsmall"}>
                                <Box direction={"row"} justify={"between"}>
                                    <Box direction={"row"} gap={"small"} align={"center"}>
                                        <Text size={"xsmall"} weight={"bolder"}>
                                            { users[1].name }
                                        </Text>
                                        <Avatar size={"6px"} background={"#cccccc"} />
                                    </Box>
                                    <Text size={"xsmall"}>
                                        11:23
                                    </Text>
                                </Box>
                                <Box direction={"row"} align={"center"} gap={"xsmall"}>
                                    <span role="img" aria-label="sheep">😱</span>
                                    <Text size={"xsmall"} style={{ marginTop: 2 }}>
                                        OMG!
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box flex pad={{ horizontal: "medium" }} gap={"small"}>
                    <Header pad={{ top: "small", bottom: "medium" }} direction={"row"} align={"center"} justify={"between"} border={"bottom"}>
                        <Box direction={"row"} gap={"small"} align={"center"} background={"background-front"} round={"medium"} pad={{ vertical: "small", horizontal: "medium" }}>
                            <Stack anchor={"top-right"}>
                                <Box>
                                    <Box direction="row">
                                        <Avatar src={users[0].avatar} size={"36px"} />
                                        <Box pad={"2px"} />
                                    </Box>
                                    <Box pad={"2px"} />
                                </Box>
                                <Avatar size={"10px"} background={"#85cf81"} />
                            </Stack>
                            <Box direction={"row"} gap={"xsmall"}>
                                <Text size={"small"} weight={"bolder"}>
                                    { users[0].name }
                                </Text>
                                <Text size={"small"} color={"text-xweak"}>
                                    님과의 대화
                                </Text>
                            </Box>
                        </Box>
                    </Header>
                    <Box flex pad={"medium"} justify={"end"} gap={"small"} overflow={"scroll"} background={"#232323"} round={"medium"} >
                        { data.map((message, index) =>
                            <MessageBox key={index} message={message} users={users} isContinuous={index > 0 && data[index - 1].user === message.user} />
                        )}
                    </Box>
                    <Footer margin={{ bottom: "6px" }} pad={{ vertical: "medium" }} border={"top"} gap={"medium"}>
                        <TextInput size={"small"} placeholder={"메시지를 입력하세요."} style={{ paddingLeft: 24 }} />
                        <Button icon={<TbSend color={"#eeeeee"} />}
                                primary
                                onClick={() => {}}
                        />
                    </Footer>
                </Box>
            </Box>
        </Box>
    );

}
