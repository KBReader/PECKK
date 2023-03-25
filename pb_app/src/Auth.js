import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";

export default function Auth() {
    const logout = useLogout();
    const {mutate: login, isLoading, isError} = useLogin();
    const {register, handleSubmit, reset} = useForm();

    const isLoggedIn = pb.authStore.isValid;

    const inputstyle = {
        width: '100%',
        background: 'transparent',
        border: '0',
        outline: '0',
        padding: '18px'
    };

    const loginstyle = {
        background: '#eaeaea',
        color: '#555',
        height: '40px',
        border: '0',
        outline: '0',
        cursor: 'pointer',
        transition: 'background 0.5s'
    };

    async function onSubmit(data) {
        login({username: data.username, password: data.password});
        reset();
    }

    if (isLoggedIn) 
        return (
            <>
                <h1>Logged In: {pb.authStore.model.username}</h1>
                <button onClick={logout}>Log Out</button>
            </>
        );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p style={{color: "red"}}>Invalid email/username or password</p>}

            <h1>Please Log In Using Email/Username</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="emailuser" placeholder="Email/Username" style={inputstyle} {...register("username")}/>
                <input type="password" id="password" placeholder="Password" style={inputstyle} {...register("password")}/>

                <button type="submit" id="loginbtn" style={loginstyle} disabled={isLoading}>{isLoading ? "Loading" : "Login"}</button>
            </form>
        </>
    );
}