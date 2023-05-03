import pb from "lib/pocketbase";
import {useMutation} from "react-query";

export default function useSignup() {
    async function signup({email, username, password, passwordConfirm}) {
        const record = {
            email: email, 
            username: username, 
            password: password, 
            passwordConfirm: passwordConfirm
        };
        await pb.collection("users").create(record);
        alert("Successfully Signed Up");
    }

    return useMutation(signup);
}