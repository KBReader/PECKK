import useLogout from "hooks/useLogout";
import pb from "lib/pocketbase";

export default function Course() {
    const logout = useLogout();

    const isLoggedIn = pb.authStore.isValid;
}