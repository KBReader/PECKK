import "./pb_public/navigation_bar.css";

export default function NavigationBar() {
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
            <html lang = "en">
                <head>
                    <link rel = "stylesheet" href = "navigation_bar.css"></link>
                </head>
                <body>
                    <div className = "container">
                        <ul>
                            <li onClick = {update_page.bind(this, 'Auth')}>Home</li>
                            <li onClick = {update_page.bind(this, 'SearchCourse')}>Search Courses</li>
                        </ul>
                    </div>
                </body>
            </html>
        </>
    );
}