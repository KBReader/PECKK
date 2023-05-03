import "./pb_public/navbar_style.css";

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
                            <li><a onClick={update_page.bind(this, 'Auth')}>Log In</a></li>
                            <li><a onClick={update_page.bind(this, 'Signup')}>Sign Up</a></li>
                        </ul>
                    </div>
                </body>
            </html>
        </>
    );
}