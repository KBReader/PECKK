import pb from "lib/pocketbase";
import {useMutation} from "react-query";

export default function useLogin() {
    async function login({username, password}) {
        const authData = await pb
            .collection("users")
            .authWithPassword(username, password);
    }

    return useMutation(login);
}