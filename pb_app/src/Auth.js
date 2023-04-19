import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import "./pb_public/login_style.css";
import Signup from "Signup";
import Home from "Home";

export default function Auth() {
    const logout = useLogout();
    const {mutate: login, isLoading, isError} = useLogin();
    const {register, handleSubmit, reset} = useForm();

    const isLoggedIn = pb.authStore.isValid;

    async function onSubmit(data) {
        login({username: data.username, password: data.password});
        reset();
    }

    async function redirect() {
        alert("This is suppose to redirect to Signup.js");
    }

    if (isLoggedIn) 
        return (
            <>
                <Home/>
            </>
        );

    /*if (onclick = true)
        return (
            <>
                <Signup/>
            </>
        );*/

    return (
        <>
            <html lang="en">
            <head>
                <meta charset="UTF-8"></meta>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Discussion Forum Login Page</title>
                <link rel="stylesheet" href="login_style.css"></link>
            </head>
            <body>
            <div class="log-container">
                <div class="log-form-box">
                    <h1>Log In with Email/Username</h1>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p style={{color: "red"}}>Invalid Information</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="log-input-group">
                            <div class="log-input-field">
                                <input type="text" id="emailuser" placeholder="Email/Username" {...register("username")}/>
                            </div>

                            <div class="log-input-field">
                                <input type="password" id="password" placeholder="Password" {...register("password")}/>
                            </div>
                        </div>

                        <div class="log-enter-btn">
                            <button type="submit" id="loginbtn" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                        </div>

                        <div class="log-toggle-btn">
                            <button type="button" id="signupbtn" onClick={redirect}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}