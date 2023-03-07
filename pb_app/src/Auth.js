import pb from "lib/pocketbase";
import { useForm } from "react-hook-form";

export default function Auth() {
    return (
        <>
            <h1>Logged In: {pb.authStore.isValid.toString}</h1>
        </>
    );
}