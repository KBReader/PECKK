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
        signup({email: data.email, username: data.username, password: data.password, passwordConfirm: data.passwordConfirm});
        alert("Successfully Signed Up");
        reset();
    }

    async function redirect() {
        alert("This is suppose to redirect to Auth.js");
    }

    if (isSignedUp)
        return (
            <>
                <Auth/>
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
            <div class="sign-container">
                <div class="sign-form-box">
                    <h1>Sign Up</h1>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p style={{color: "red"}}>Missing Information</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="sign-input-group">
                            <div class="sign-input-field">
                                <input type="email" id="email" placeholder="Email" {...register("email")}/>
                            </div>

                            <div class="sign-input-field">
                                <input type="text" id="username" placeholder="Username" {...register("username")}/>
                            </div>

                            <div class="sign-input-field">
                                <input type="password" id="password" placeholder="Password" {...register("password")}/>
                            </div>

                            <div class="sign-input-field">
                                <input type="password" id="passwordConfirm" placeholder="Confirm Password" {...register("passwordConfirm")}/>
                            </div>
                        </div>

                        <div class="sign-enter-btn">
                            <button type="submit" id="signupbtn" disabled={isLoading}>{isLoading ? "Loading" : "Signup"}</button>
                        </div>

                        <div class="sign-toggle-btn">
                            <button type="button" id="loginbtn" onClick={redirect}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}
