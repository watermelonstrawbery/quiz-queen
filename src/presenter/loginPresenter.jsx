import { observer } from "mobx-react-lite";
import { signOut } from "firebase/auth";
import { LoginView } from "../view/loginView";
import { useState } from "react";

import { firebaseConfig } from "../../firebaseConfig.js"
import { initializeApp } from "firebase/app";

const Login = observer(
    function LoginRender(props) {

        async function googleHandleLoginACB(){
            try{
                const user = await props.loginModel.googleLogin();
                props.model.setUser(user);
                window.location.hash = "/friendsView"
            } catch {
                console.log("Google login failed:", error.message);
            }
        }

        async function facebookHandleLoginACB(){
            try{
                const user = await props.loginModel.facebookLogin();
                props.model.setUser(user);
                window.location.hash = "/friendsView"
            } catch(error) {
                console.log("Facebook login failed:", error.message);
            }
        }

        // Determine if a user is logged in
        //const user = auth.currentUser;

        return (
            <div>
                <LoginView
                    text = {props.model.test}

                    googleLogin = { googleHandleLoginACB }
                    facebookLogin = { facebookHandleLoginACB }
                    user={props.loginModel.user}
                    error={props.loginModel.error}
                    onPlayTrainingGame = {resetTrainingGameACB}
                />
            </div>
        );

    function resetTrainingGameACB(){
        props.model.resetTrainingGame();
    }
});

export { Login };
