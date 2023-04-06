import useSignup from "hooks/useSignup";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import "./pb_public/signup_style.css";
import Auth from "Auth";

export default function Signup() {
    const {mutate: signup, isLoading, isError} = useSignup();
    const {register, handleSubmit, reset} = useForm();

    const isSignedUp = pb.authStore.isValid;

    async function onSubmit(data) {
        signup({email: data.email, username: data.username, password: data.password});
        reset();
    }

    if (isSignedUp)
        return (
            <>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"></meta>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <title>Discussion Forum Sign Up Page</title>
                    <link rel="stylesheet" href="signup_style.css"></link>
                </head>
                <body>
                <div class="container">
                    <div class="form-box">
                        <h1>Successfully signed up as: {pb.authStore.model.username}</h1>

                        <div class="toggle-btn">
                            <button type="button" id="loginbtn">Login</button>
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
                <title>Discussion Forum Sign Up Page</title>
                <link rel="stylesheet" href="signup_style.css"></link>
            </head>
            <body>
            <div class="container">
                <div class="form-box">
                    <h1>Sign Up</h1>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p style={{color: "red"}}>Missing Information</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="input-group">
                            <div class="input-field">
                                <input type="email" id="email" placeholder="Email" {...register("email")}/>
                            </div>

                            <div class="input-field">
                                <input type="text" id="username" placeholder="Username" {...register("username")}/>
                            </div>

                            <div class="input-field">
                                <input type="password" id="password" placeholder="Password" {...register("password")}/>
                            </div>
                        </div>

                        <div class="enter-btn">
                            <button type="button" id="signupbtn" disabled={isLoading}>{isLoading ? "Loading" : "Signup"}</button>
                        </div>

                        <div class="toggle-btn">
                            <button type="button" id="loginbtn" onClick={Auth}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}

