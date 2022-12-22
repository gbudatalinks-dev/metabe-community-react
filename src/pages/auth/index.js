import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Card, CardHeader, CardBody, Heading, Button } from "grommet";
import { Facebook, Google } from "grommet-icons";

import { auth, provider } from "../../config/firebase";
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, browserSessionPersistence, signInWithCustomToken } from "firebase/auth";

import { AppContext } from "../../context";

import axios from "axios";
//import { auth } from "../config/firebase";
//import { signInWithCustomToken, browserSessionPersistence } from "firebase/auth";

export default function SignIn(props) {

    const CLIENT_ID = "a52e91ebb1900470b61f7abfc1b2a02d";
    const REDIRECT_URI =  "http://localhost:3000";

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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

    const signInWithFacebook = () => {
        auth.setPersistence(browserSessionPersistence);
        //provider.addScope("https://www.googleapis.com/auth/drive");
        const provider = new FacebookAuthProvider();

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
                const credential = FacebookAuthProvider.credentialFromResult(result);
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

    React.useEffect(() => {
        // for naver login
        
        const { naver } = window
        const NAVER_CLIENT_ID = "zaXYIjjfQhsx3MzNzraW";
        const NAVER_CALLBACK_URL = "http://localhost:3000/#/naversignin/";
    
        const initializeNaverLogin = () => {
            const naverLogin = new naver.LoginWithNaverId({
                clientId: NAVER_CLIENT_ID,
                callbackUrl: NAVER_CALLBACK_URL,     
                isPopup: false,
                loginButton: { color: 'green', type: 3, height: 58 },
                callbackHandle: true,
            });

            naverLogin.init();

        }

        initializeNaverLogin();


        // for Kakao login

        let customToken;

        //axios.defaults.withCredentials = true;

        const code = new URL(window.location.href).searchParams.get("code");
        console.log("Kakao auth code :: " + code);
        if (code)
        {
            axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`
                ,{
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
            ).then((res) => {
                console.log(res);
                console.log("kakao access token " + res.data.access_token);
                axios({
                    url: 'http://localhost:8089/verifyToken',
                    method: 'post',
                    data: {
                        token: res.data.access_token
                    }
                })
                .then(response => {
                    console.log("get Firebase token : " + response.data.firebase_token);
                    customToken = response.data.firebase_token;

                    auth.setPersistence(browserSessionPersistence);
        
                    const user = auth.currentUser;
                    
                    if (user) {
                        const token = sessionStorage.getItem("GoogleAccessToken");
                        console.log(user);
            
                        console.log("access token : " + token);
                        signInAction(user);
                        navigate("/main");
                    }
                    else
                    {
                        signInWithCustomToken(auth, customToken).then((result) => {
            
                            // The signed-in user info.
                            console.log("kakao login succeeded " + result.user);

                            if (result.user !== null && result.user !== undefined) {
                                signInAction(result.user);
                                navigate("/main");
                            }
                            else {
                                console.error("User is undefined");
                            }
                        });
                    }

                })
                .catch(error => {
                    console.log("Firebase token get failed : " + error);
                });
        
                
            })
        }
    }, [navigate, signInAction]);

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
                    <Button icon={<Facebook />} size="large" label="페이스북으로 로그인" onClick={() => signInWithFacebook()} primary />
                    <a href={KAKAO_AUTH_URL}>Kakao Login</a>
                    <div id='naverIdLogin'>
                    </div>
                </CardBody>
            </Card>
        </Box>
    );

}
