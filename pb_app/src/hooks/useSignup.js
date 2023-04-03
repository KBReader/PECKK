import pb from "lib/pocketbase";
import {useMutation} from "react-query";

export default function useSignup() {
    async function signup({email, username, password}) {
        const newRecord = await pb
            .collection("users")
            .create(email, username, password);
    }

    return useMutation(signup);
}