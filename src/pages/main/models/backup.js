import React from "react";
import { useParams } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import * as tmPose from "@teachablemachine/pose";

import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, FileInput, Heading, Image, Spinner, Text
} from "grommet";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const options = {
    indexAxis: "y",
    elements: {
        bar: {
            borderWidth: 2,
        }
    },
    responsive: false,
    plugins: {
        legend: {
            position: "right",
        }
    }
};

export default function Models(props) {

    const { modelId } = useParams();

    const [ type, setType ] = React.useState(undefined);
    const [ name, setName ] = React.useState("");
    const [ description, setDescription ] = React.useState(undefined);
    const [ modelUrl, setModelUrl ] = React.useState(undefined);
    const [ labels, setLabels ] = React.useState([]);

    const [ imagePreviewUrl, setImagePreviewUrl ] = React.useState(undefined);
    const [ testing, setTesting ] = React.useState(false);
    const [ finished, setFinished ] = React.useState(false);
    const [ data, setData ] = React.useState(undefined);

    let model, webcam, ctx;

    React.useEffect(() => {
        const loadModel = async () => {
            const docRef = doc(db, "models", modelId);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setType(data.type);
            setName(data.name);
            setDescription(data.description);
            setModelUrl(data.modelUrl);
            setLabels(data.labels);
            return { type: data.type, url: data.modelUrl };
        };

        loadModel().then(result => {
            if (result.type === "POSE") {
                testWithWebcam(result.url);
            }
        });

        return function cleanup() {
            if (webcam) {
                webcam.stop();
            }
        }
        // eslint-disable-next-line
    }, [modelId]);

    const setLabelContainerValue = (value) => {
        const labelContainer = document.getElementById("label-container");
        if (labelContainer) {
            labelContainer.innerHTML = value;
        }
    };

    const testWithWebcam = async (url) => {
        const modelInfoUrl = url + "model.json";
        const metaDataUrl = url + "metadata.json";
        model = await tmPose.load(modelInfoUrl, metaDataUrl);

        // labelContainer = document.getElementById("label-container");

        const size = 480;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        const canvas = document.getElementById("canvas");
        canvas.width = size;
        canvas.height = size;
        ctx = canvas.getContext("2d");
    };

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);

        let labelNames = [], probabilities = [];
        prediction.forEach(p => {
            labelNames.push(p.className);
            probabilities.push(p.probability * 100);
        });

        setData({
            labels: labelNames,
            datasets: [{
                data: probabilities,
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
            }]
        });

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    const testWithImage = async () => {
        setTesting(true);

        const modelInfoUrl = modelUrl + "model.json";
        const metaDataUrl = modelUrl + "metadata.json";
        model = await tmImage.load(modelInfoUrl, metaDataUrl);

        const image = document.getElementById("preview");
        const prediction = await model.predict(image, false);

        let maxValue = 0, label = undefined;
        let labelNames = [], probabilities = [];
        prediction.forEach(p => {
            labelNames.push(p.className);
            probabilities.push(p.probability * 100);
            if (p.probability > maxValue) {
                maxValue = p.probability;
                label = p.className;
            }
        });

        labels.forEach(l => {
            if (l.name === label) {
                setLabelContainerValue(l.description);
            }
        });

        setTesting(false);
        setFinished(true);

        setData({
            labels: labelNames,
            datasets: [{
                data: probabilities,
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
            }]
        });
    };

    const retry = () => {
        setImagePreviewUrl(undefined);
        setData(undefined);
        setFinished(false);
        setLabelContainerValue("");
    };

    return (
        <Box pad={"medium"} background={"background-back"} flex={true} overflow={"scroll"}>
            <Card pad={"medium"} background={"light-1"} flex={"grow"}>
                <CardHeader alignSelf={"center"} margin={{ "bottom": "xsmall" }}>
                    <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                        { name }
                    </Heading>
                </CardHeader>
                <CardBody alignSelf={"center"} fill={"vertical"} gap={"medium"}>
                    <Box alignSelf={"center"}>
                        <div dangerouslySetInnerHTML={ {__html: description} } />
                    </Box>
                    <Box width={"xlarge"} align={"center"} margin={{ top: "medium" }}>
                        { imagePreviewUrl === undefined && type === "IMAGE" &&
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
                                        testWithImage();
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        }
                        { imagePreviewUrl !== undefined &&
                            <Box width={"large"}>
                                <Image id={"preview"} src={imagePreviewUrl} fit={"contain"} alignSelf={"center"} />
                                { testing && (
                                    <Box align="center" justify="center" gap="small" direction="row" alignSelf="center" pad="small">
                                        <Spinner />
                                        <Text>분석중...</Text>
                                    </Box>
                                )}
                            </Box>
                        }
                        { type === "POSE" &&
                            <canvas id="canvas" />
                        }
                    </Box>
                    <Box id="label-container" align={"center"} />
                    <Box alignSelf={"center"} width={"480px"}>
                        { data !== undefined && <Bar data={data} options={options} width="480px" /> }
                    </Box>
                    <Box as="footer" gap="small" direction="row" align="center" justify="center"
                         pad={{ top: "medium", bottom: "small" }}
                    >
                        { finished &&
                            <Button
                                label="다시하기"
                                type="button"
                                primary
                                onClick={() => retry()}
                            />
                        }
                    </Box>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
        </Box>
    );

}
