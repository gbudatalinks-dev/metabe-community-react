import React from "react";

import { Box, Card, CardHeader, CardBody, CardFooter, Heading, Select, Button} from "grommet";

import { storage } from "../../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

import axios from 'axios';

export default function Settings() {

    const [ options, setOptions ] = React.useState([]);
    const [ selected, setSelected ] = React.useState(undefined);

    const [ value, setValue ] = React.useState(undefined);

    const [ uploading, setUploading ] = React.useState(false);

    React.useEffect(() => {
        searchFile();
    }, []);

    const searchFile = async () => {
        const dateFilter = new Date('January 01, 2022').toISOString();
        const token = sessionStorage.getItem("GoogleAccessToken");

        try {
            const files = await axios({
                method: "get",
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {"Authorization" : "Bearer " + token,
                            "Content-Type" : "application/json"},
                params: {
                    "q": `createdTime >= '${dateFilter}' or modifiedTime >= '${dateFilter}'`,
                    "fields": 'files(name, id)',
                    // "fields": 'files(id,name,modifiedTime,createdTime,mimeType,size)',
                    "spaces": 'drive',
                },
            });

            setOptions(files.data.files);

        } catch(error) {
            console.log(error);
        }
    }

    const onUpload = async () => {
        setUploading(true);

        console.log("file id upload " + value);

        const token = sessionStorage.getItem("GoogleAccessToken");

        try {
            const response = await axios({
                method: "get",
                url: "https://www.googleapis.com/drive/v3/files/" + value + "",
                headers: {"Authorization" : "Bearer " + token,
                            "Content-Type" : "application/json"},
                params: {
                    "alt": 'media',
                },
                responseType: "blob",
            });

            const storageRef = ref(storage, `userUpload/` + value);

            uploadBytes(storageRef, response.data).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

        } catch(error) {
            console.log(error);
        }

        setUploading(false);
    };

    return (
        <>
            <Box pad="medium" background="background-back" flex={true}>
                <Card pad="medium" background="light-1">
                    <CardHeader margin={{ "bottom": "xsmall" }}>
                        <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                            모델 테스트
                        </Heading>
                    </CardHeader>
                    <CardBody fill="vertical">
                        <Box alignSelf={"start"} gap={"medium"}>
                            <Select
                                multiple
                                size="medium"
                                placeholder="모델 선택"
                                labelKey="name"
                                valueKey={{ key: "id", reduce: true }}
                                value={value}
                                options={options}
                                onChange={({ value: nextValue }) => {
                                    setValue(nextValue);
                                    const weightfile = options.filter(c => c.index === nextValue)[0];
                                    setSelected(weightfile);
                                    console.log("file : " + nextValue);
                                }}
                            />
                        </Box>
                    </CardBody>
                    <CardFooter>
                        <Box direction={"row"} gap={"small"}>
                            <Button label={
                                    uploading ? "업로딩" : "클라우드 업로드"
                                }
                                type="button"
                                disabled={uploading}
                                primary
                                onClick={onUpload}
                            />
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
        </>
    );

}
