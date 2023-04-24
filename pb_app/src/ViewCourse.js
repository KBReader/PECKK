import pb from "lib/pocketbase";
import {useForm} from "react-hook-form";

var course_key = "xevrrssnhuae644";

export default function ViewCourse() {
    const {register, handleSubmit, reset} = useForm();

    async function generate_containers() {
        try {
            const course = await pb.collection('courses').getFullList({
                filter: `id = "${course_key}"`
            });

            const discussions = await pb.collection('course_discussion').getFullList({
                filter: `course_key = "${course_key}"`
            });

            const course_header = course[0].subject + " " + course[0].number 
                + " - " + course[0].name;

            var parent_container = document.getElementById("parent_container");

            var parent_container_title = document.createElement('h1');
            parent_container_title.setAttribute("className", "course_header");
            parent_container_title.innerText = course_header;
            parent_container.appendChild(parent_container_title);

            for (var i = 0; i < discussions.length; i++) {
                var discussion_i = document.createElement('div');
                discussion_i.setAttribute("className", "discussion_container");

                var discussion_title = document.createElement('h3');
                discussion_title.innerText = discussion[i].title;
                discussion_i.appendChild(discussion_title);

                parent_container.appendChild(discussion_i);
            }
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <div className="parent_container" id="parent_container"
                    onLoad={generate_containers()}>
                </div>
            </body>
        </html>
    );
}