import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Card, CardHeader, CardBody, Heading, Button } from "grommet";
import { Google } from "grommet-icons";

import { auth, provider } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider, browserSessionPersistence } from "firebase/auth";

import { AppContext } from "../../context";

export default function SignIn(props) {

    const navigate = useNavigate();
    const { signInAction } = React.useContext(AppContext);

    const signInWithGoogle = () => {
        auth.setPersistence(browserSessionPersistence);
        provider.addScope("https://www.googleapis.com/auth/drive");

        const user = auth.currentUser;

        if (user) {
            const token = sessionStorage.getItem("GoogleAccessToken");
            console.log(user);
            console.log("access token : " + token);
            signInAction(user);
            navigate("/main");
        }
        else {
            signInWithPopup(auth, provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                console.log(result.user);
                console.log("access token : " + token)
                sessionStorage.setItem("GoogleAccessToken", token);

                if (result.user !== null && result.user !== undefined) {
                    signInAction(result.user);
                    navigate("/main");
                }
                else {
                    console.error("User is undefined");
                }
            });
        }
    };

    return (
        <Box justify="center" align="center" pad="large" fill>
            <Card pad="large" gap="medium">
                <CardHeader>
                    <Heading level={"3"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                        로그인
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Button icon={<Google />} size="large" label="구글로 로그인" onClick={() => signInWithGoogle()} primary />
                </CardBody>
            </Card>
        </Box>
    );

}
