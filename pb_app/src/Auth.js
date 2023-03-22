import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";

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
                <input type="text" placeholder="username" {...register("username")}/>
                <input type="password" placeholder="password" {...register("password")}/>

                <button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Login"}</button>
            </form>
        </>
    );
}