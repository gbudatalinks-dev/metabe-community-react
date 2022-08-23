import React from "react";
import * as tmImage from "@teachablemachine/image";

import {Box, FileInput, Image, Spinner, Text, Button} from "grommet";

export default function UseModel({ url, labels, onClose }) {

    const [ imagePreviewUrl, setImagePreviewUrl ] = React.useState(undefined);
    const [ testing, setTesting ] = React.useState(false);
    const [ finished, setFinished ] = React.useState(false);

    const test = async () => {
        setTesting(true);

        const modelUrl = url + "model.json";
        const metaDataUrl = url + "metadata.json";
        const model = await tmImage.load(modelUrl, metaDataUrl);
        let labelContainer = document.getElementById("label-container");

        const image = document.getElementById("preview");
        const prediction = await model.predict(image, false);

        let maxValue = 0, label = undefined;
        prediction.forEach(p => {
            if (p.probability > maxValue) {
                maxValue = p.probability;
                label = p.className;
            }
        });

        labels.forEach(l => {
            if (l.name === label) {
                labelContainer.innerHTML = l.description;
            }
        });

        setTesting(false);
        setFinished(true);
    };

    const retry = () => {
        setImagePreviewUrl(undefined);
        setFinished(false);
    };

    return (
        <Box pad="medium" gap="small" width="xlarge" flex={true} overflow="scroll">
            <Box width={"xlarge"} align={"center"} margin={{ top: "medium" }}>
                { imagePreviewUrl === undefined &&
                    <FileInput
                        accept="image/*"
                        messages={{
                            browse: "선택",
                            dropPrompt: "이미지 파일을 여기에 드래그 하세요.",
                            remove: "삭제",
                        }}
                        onChange={(event, { files }) => {
                            let file = files[0];
                            let reader = new FileReader();
                            reader.onloadend = () => {
                                setImagePreviewUrl(reader.result);
                                test();
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                }
                { imagePreviewUrl !== undefined &&
                    <Box width={"large"}>
                        <Image id={"preview"} src={imagePreviewUrl} fit={"contain"} alignSelf={"center"} />
                        <Box id="label-container" align={"center"} />
                        { testing && (
                            <Box align="center" justify="center" gap="small" direction="row" alignSelf="center" pad="small">
                                <Spinner />
                                <Text>분석중...</Text>
                            </Box>
                        )}
                    </Box>
                }
            </Box>
            <Box as="footer" gap="small" direction="row" align="center" justify="center"
                 pad={{ top: "medium", bottom: "small" }}
            >
                <Button
                    label="닫기"
                    color="dark-3"
                    onClick={() => onClose()}
                    disabled={testing}
                />
                { finished &&
                    <Button
                        label="다시하기"
                        type="button"
                        primary
                        onClick={() => retry()}
                    />
                }
            </Box>
        </Box>
    );

}
