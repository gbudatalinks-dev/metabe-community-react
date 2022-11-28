import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Heading, Button, Text } from "grommet";
import { Google } from "grommet-icons";

import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { auth, provider, db } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider, browserSessionPersistence } from "firebase/auth";

import { AppContext } from "../../context";

export default function SignIn(props) {

    const navigate = useNavigate();
    const { signInAction } = React.useContext(AppContext);

    const signInWithGoogle = async () => {
        await auth.setPersistence(browserSessionPersistence);
        provider.addScope("https://www.googleapis.com/auth/drive");

        const user = auth.currentUser;

        if (user) {
            // eslint-disable-next-line no-unused-vars
            const token = sessionStorage.getItem("googleAccessToken");
            // console.log(user);
            // console.log("access token : " + token);
            const userData = await setUserData(user);
            signInAction(userData);
            navigate("/main");
        }
        else {
            signInWithPopup(auth, provider).then(async (result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                // console.log(result.user);
                // console.log("access token : " + token)
                sessionStorage.setItem("googleAccessToken", token);

                if (result.user !== null && result.user !== undefined) {
                    const userData = await setUserData(result.user);
                    // console.log(userData);
                    signInAction(userData);
                    navigate("/main");
                }
                else {
                    console.error("User is undefined");
                }
            });
        }
    };

    const setUserData = async(user) => {
        const q = query(
            collection(db, "users"),
            where("authId", "==", user.uid),
            where("deleted", "==", false)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            const userData = {
                authId: user.uid,
                provider: "google.com",
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                rank: 0,
                appCount: 0,
                subscriberCount: 0,
                likeCount: 0,
                playCount: 0,
                subscriptions: [],
                bookmarks: [],
                blocks: [],
                blockUsers: [],
                reportCount: 0,
                reporters: [],
                deleted: false,
            };
            const docRef = await addDoc(collection(db, "users"), userData);
            userData["uid"] = docRef.id;
            return userData;
        }
        else {
            const userRef = querySnapshot.docs[0];
            const userData = userRef.data();
            userData["uid"] = userRef.id;
            return userData;
        }
    };

    return (
        <Box justify="center" align="center" pad="large" fill>
            <Box pad="large" gap="medium" background={"#1c1d24"} round={true}>
                <Heading level={"3"} color={"#fff"} style={{ fontFamily: "Noto Sans KR", fontWeight: 900 }}>
                    로그인
                </Heading>
                <Button
                    icon={<Google color={"#ffffff"} />}
                    size={"large"}
                    label={<Text color={"#ffffff"}>구글로 로그인</Text>}
                    onClick={() => signInWithGoogle()}
                    primary
                />
            </Box>
        </Box>
    );

}
