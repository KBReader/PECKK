import useLogout from "hooks/useLogout";
import pb from "lib/pocketbase";

export default function Discussion() {
    const logout = useLogout();

    const isLoggedIn = pb.authStore.isValid;
}