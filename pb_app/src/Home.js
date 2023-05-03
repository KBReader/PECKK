import useLogout from "hooks/useLogout";
import pb from "lib/pocketbase";
import {useForm} from "react-hook-form";
import "./pb_public/home_style.css";
import NavigationBar from "NavigationBar";

export default function Home() {
    const logout = useLogout();

    const isLoggedIn = pb.authStore.isValid;

    if (isLoggedIn)
        return (
            <>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"></meta>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <title>Discussion Forum Home Page</title>
                    <link rel="stylesheet" href="home_style.css"></link>
                </head>
                <body>
                <div class="home-container">
                    <NavigationBar/>
                    <div class="home-form-box">
                        <h1 id="title">Discussion Forum Home Page</h1>
                        <div class="logout-btn">
                            <a href="Auth.js" onClick={logout}>Logout</a>
                        </div>
                    </div>
                </div>
                </body>
                </html>
            </>
        );
}