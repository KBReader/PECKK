import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import "./pb_public/background.jpg";

export default function Auth() {
    const logout = useLogout();
    const {mutate: login, isLoading, isError} = useLogin();
    const {register, handleSubmit, reset} = useForm();

    const isLoggedIn = pb.authStore.isValid;

    const container = {
        margin: '0',
        padding: '0',
        fontFamily: 'Poppins, sans-serif',
        boxSizing: 'border-box',
        width: '100',
        height: '100vh',
        backgroundImage: "url('background.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative'
    }

    const formbox = {
        width: '90%',
        maxWidth: '450px',
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: '#fff',
        padding: '50px 60px 150px',
        textAlign: 'center'
    }

    const formboxh1 = {
        fontSize: '30px',
        marginBottom: '60px',
        color: '#3c00a0',
        position: 'relative'
    }

    const inputgroup = {
        height: '200px'
    }

    const inputfield = {
        background: '#eaeaea',
        margin: '15px 0',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        maxHeight: '65%',
        transition: 'max-height 0.5s',
        overflow: 'hidden'
    }

    const input = {
        width: '100%',
        background: 'transparent',
        border: '0',
        outline: '0',
        padding: '18px'
    }

    const loginbtn = {
        width: '100%',
        margin: '60px 0px',
        display: 'flex',
        position: 'absolute',
        left: '25%'
    }

    const loginbtnbutton = {
        flexBasis: '48%',
        background: '#eaeaea',
        color: '#555',
        height: '40px',
        borderRadius: '20px',
        border: '0',
        outline: '0',
        marginBottom: '0',
        cursor: 'pointer',
        transition: 'background 0.5s'
    }

    const togglebtn = {
        width: '20%',
        display: 'flex',
        position: 'absolute',
        left: '40%'
    }

    const togglebtnbutton = {
        flexBasis: '100%',
        background: '#3c00a0',
        color: '#fff',
        height: '25px',
        borderRadius: '3px',
        border: '0',
        outline: '0',
        cursor: 'pointer',
        transition: 'background 0.5s'
    }

    async function onSubmit(data) {
        login({username: data.username, password: data.password});
        reset();
    }

    if (isLoggedIn) 
        return (
            <>
                <h1 style={formboxh1}>Logged in as: {pb.authStore.model.username}</h1>
                <button style={loginbtnbutton} onClick={logout}>Log Out</button>
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
                <link rel="stylesheet" href="login_page.css"></link>
            </head>
            <body>
            {isLoading && <p>Loading...</p>}
            {isError && <p style={{color: "red"}}>Invalid Information</p>}
            <div class="container" style={container}>
                <div class="form-box" style={formbox}>
                    <h1 style={formboxh1}>Log In with Email/Username</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="input-group" style={inputgroup}>
                            <div class="input-field" style={inputfield}>
                                <input type="text" id="emailuser" style={input} placeholder="Email/Username" {...register("username")}/>
                            </div>

                            <div class="input-field" style={inputfield}>
                                <input type="password" id="password" style={input} placeholder="Password" {...register("password")}/>
                            </div>
                        </div>

                        <div class="enter-btn" style={loginbtn}>
                            <button type="submit" id="loginbtn" style={loginbtnbutton} disabled={isLoading}>{isLoading ? "Loading" : "Login"}</button>
                        </div>

                        <div class="toggle-btn" style={togglebtn}>
                            <button type="button" id="signupbtn" style={togglebtnbutton}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}