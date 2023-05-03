import pb from "lib/pocketbase";
import "./pb_public/navbar_style.css";

export default function NavigationBar() {
    const isLoggedIn = pb.authStore.isValid;

    async function update_page(page) {
        if (page === 'Auth') {
            localStorage.setItem('current_page', 'Auth');
        }
        else if (page === 'SearchCourse') {
            localStorage.setItem('current_page', 'SearchCourse');
        }
        window.location.reload();
    }

    return (
        <>
            <html lang="en">
                <head>
                    <link rel="stylesheet" href="nav_bar.css"></link>
                </head>
                <body>
                    <div className="nav-container">
                        <ul>
                            <li><a onClick={update_page.bind(this, 'Auth')}>Home</a></li>
                            <li><a onClick={update_page.bind(this, 'SearchCourse')}>Search Course</a></li>
                            <li style={{float: "right"}}><a>Logged In As: {pb.authStore.model.username}</a></li>
                        </ul>
                    </div>
                </body>
            </html>
        </>
    );
}