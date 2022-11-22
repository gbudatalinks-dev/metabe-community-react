import React from 'react';
import axios from "axios";
import { Box } from "grommet";
import { useNavigate } from "react-router-dom";
import { browserSessionPersistence, signInWithCustomToken } from "firebase/auth";

import { auth } from "../../../config/firebase";
import { AppContext } from "../../../context";

export default function NaverSignIn(props) {
    
    const navigate = useNavigate();
    const { signInAction } = React.useContext(AppContext);
    
    React.useEffect(() => {
        let naverAccessToken;
        let customToken;

        const naverUserAccessToken = () => {
            window.location.href.includes('access_token') && naverGetToken()
        }
            
        const naverGetToken = () => {
            naverAccessToken = window.location.href.split('=')[1].split('&')[0]
            console.log("naver access token " + naverAccessToken);
        }
        
        naverUserAccessToken();

        if (naverAccessToken)
        {
            axios({
                url: 'http://localhost:8099/verifyToken',
                method: 'post',
                data: {
                    token: naverAccessToken
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
                        console.log("naver login succeeded " + result.user);
    
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
        }

    }, [navigate, signInAction]);

    return (
        <Box justify="center" align="center" pad="large" fill>
            Redirect page for Naver Login
        </Box>
    );

}
