import pb from "lib/pocketbase.js";
import NavigationBar from "NavigationBar";

// import "./pb_public/login_style.css";
// import "./pb_publc/view_discussion_style.css";  TODO: create this css file

var course_key = localStorage.getItem('course_key');

export default function ViewCourse() {
    async function view_discussion(discussion_key) {
        localStorage.setItem('discussion_key', discussion_key);
        localStorage.setItem('current_page', 'ViewDiscussion');
        window.location.reload();
    }

    async function create_discussion_button() {
        localStorage.setItem('current_page', 'CreateDiscussion');
        window.location.reload();
    }

    async function generate_containers() {
        try {
            const course = await pb.collection('courses').getFullList({
                filter: `id = "${course_key}"`
            });

            const discussions = await pb.collection('course_discussions')
                .getFullList({
                    filter: `course_key = "${course_key}"`,
                    // sort: '-created',
            });

            const course_header = course[0].subject.toUpperCase() + " " + course[0].number.toUpperCase()
                + " - " + course[0].name;

            var parent_container = document.getElementById('parent_container');
            var course_title = document.createElement('h1');
            course_title.setAttribute("className", "course_title");
            course_title.innerText = course_header;
            parent_container.appendChild(course_title);

            // course boxes
            for (var i = 0; i < discussions.length; i++) {
                var discussion_i = document.createElement('div');
                discussion_i.setAttribute("className", "discussion_container");

                var discussion_title = document.createElement('h3');
                discussion_title.setAttribute("className", "discussion_title");
                discussion_title.innerText = discussions[i].title;

                discussion_title.addEventListener('click', view_discussion.bind(this, discussions[i].id));

                discussion_i.appendChild(discussion_title);
                parent_container.appendChild(discussion_i);
            }
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    // var list = [<ViewCourseLinkGenerator/>]

    return (
        <>
            <NavigationBar/>
            <html lang = "en">
                <head>
                </head>
                <body onLoad = {generate_containers()}>
                    <div className = "parent_container" id = "parent_container">
                    </div>
                    <div className = "container">
                        <button id = "create_discussion_button" onClick = {create_discussion_button.bind(this)}>CREATE DISCUSSION</button>
                    </div>
                </body>
            </html>
        </>
    );
}