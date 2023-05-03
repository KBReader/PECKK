import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import "./pb_public/login_style.css";
import Home from "Home";
import LoginNav from "LoginNav";

export default function Auth() {
    const {mutate: login, isLoading, isError} = useLogin();
    const {register, handleSubmit, reset} = useForm();

    const isLoggedIn = pb.authStore.isValid;

    async function onSubmit(data) {
        login({username: data.username, password: data.password});
        reset();
    }

    if (isLoggedIn) 
        return (
            <>
                <Home/>
            </>
        );

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
                <LoginNav/>
                <div class="log-form-box">
                    <h1>Log In with Email/Username</h1>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p style={{color: "red"}}>Invalid or Missing Information</p>}
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
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}