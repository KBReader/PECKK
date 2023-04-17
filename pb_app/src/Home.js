import pb from "lib/pocketbase";
import {useForm} from "react-hook-form";
import "./pb_public/home_style.css";

export default function Home() {
    const {register, handleSubmit, reset} = useForm();

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
            <div class="container">
                <div class="form-box">
                    <h1 id="title">Discussion Forum Home Page</h1>

                    <div class="dropdown">
                        <button class="dropbtn">Navigation</button>

                        <div class="dropdown-links">
                            <a href="home_page.html">Home</a>
                            <a href="courses_page.html">Courses</a>
                            <a href="profile_page.html">Profile</a>
                            <a href="login_page.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            </body>
            </html>
        </>
    );
}