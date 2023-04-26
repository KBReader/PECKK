import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
// import "./pb_public/login_style.css";
import Signup from "Signup";
import NavigationBar from "NavigationBar";

export default function Auth() {
    const logout = useLogout();
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
                <NavigationBar/>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"></meta>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <title>Discussion Forum Login Page</title>
                    <link rel="stylesheet" href="login_style.css"></link>
                </head>
                <body>
                <div class="container">
                    <div class="form-box">
                        <h1>Logged in as: {pb.authStore.model.username}</h1>

                        <div class="enter-btn">
                            <button onClick={logout}>Log Out</button>
                        </div>

                        <div class="toggle-btn">
                            <button type="button" id="homebtn">Homepage</button>
                        </div>
                    </div>
                </div>
                </body>
                </html>
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
            <div class="container">
                <div class="form-box">
                    <h1>Log In with Email/Username</h1>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p style={{color: "red"}}>Invalid Information</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="input-group">
                            <div class="input-field">
                                <input type="text" id="emailuser" placeholder="Email/Username" {...register("username")}/>
                            </div>

                            <div class="input-field">
                                <input type="password" id="password" placeholder="Password" {...register("password")}/>
                            </div>
                        </div>

                        <div class="enter-btn">
                            <button type="submit" id="loginbtn" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                        </div>

                        <div class="toggle-btn">
                            <button type="button" id="signupbtn" onClick={Signup}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}