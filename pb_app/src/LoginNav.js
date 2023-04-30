import "./pb_public/login_nav_style.css";

export default function LoginNav() {
    async function update_page(page) {
        if (page === 'Signup') {
            localStorage.setItem('current_page', 'Signup');
        }
        if (page === 'Auth') {
            localStorage.setItem('current_page', 'Auth');
        }
        window.location.reload();
    }

    return (
        <>
            <html lang="en">
                <head>
                    <link rel="stylesheet" href="login_nav_style.css"></link>
                </head>
                <body>
                    <div className="nav-container">
                        <ul>
                            <li onClick={update_page.bind(this, 'Auth')}>Log In</li>
                            <li onClick={update_page.bind(this, 'Signup')}>Sign Up</li>
                        </ul>
                    </div>
                </body>
            </html>
        </>
    );
}