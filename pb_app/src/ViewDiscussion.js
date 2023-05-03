import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import NavigationBar from "NavigationBar";

import "./pb_public/vd_style.css";

var discussion_key = localStorage.getItem('discussion_key');

export default function ViewDiscussion() {
    const {register, handleSubmit, reset} = useForm();

    async function create_answer_button(data) {
        const answer_description = data.answer_description;

        try {
            const answer_data = {
                "discussion_key": discussion_key,
                "description": answer_description,
                "username": pb.authStore.model.username,
            };

            await pb.collection('discussion_posts').create(answer_data);
            console.log('New answer created.');
        }
        catch (error) {
            console.log('Error creating answer: ', error);
        }

        reset();
        window.location.reload();
    }

    async function generate_containers() {
        try {
            const discussion = await pb.collection('course_discussions')
                .getFullList({
                    filter: `id = "${discussion_key}"`,
            });

            const posts = await pb.collection('discussion_posts').getFullList({
                filter: `discussion_key = "${discussion_key}"`,
            });

            const discussion_title = discussion[0].title;

            var parent_container = document.getElementById("parent_container");
            
            var parent_container_title = document.createElement('h2');
            parent_container_title.setAttribute(
                "className", "discussion_title");
            parent_container_title.innerText = discussion_title;
            parent_container.appendChild(parent_container_title);

            // question container
            var question_div = document.createElement('div');
            question_div.setAttribute("className", "question_container")
            
            var asker_username = document.createElement('p');
            asker_username.setAttribute("className", "username_text");
            asker_username.innerText = "Asked by: " + posts[0].username;
            var question_desc = document.createElement('p');
            question_desc.innerText = posts[0].description;
            question_div.appendChild(asker_username);
            question_div.appendChild(question_desc);
            parent_container.appendChild(question_div);

            // answer containers
            for (var i = 1; i < posts.length; i++) {
                var answer_i = document.createElement('div');
                answer_i.setAttribute("className", "answer_container");

                var username = document.createElement('p')
                username.innerText = "Reply by: " + posts[i].username;
                answer_i.appendChild(username)

                var desc = document.createElement('p');
                desc.innerText = posts[i].description;
                answer_i.appendChild(desc);

                parent_container.appendChild(answer_i);
            }
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <>
            <html lang = "en">
                <head>
                </head>
                <body>
                    <div className = "vd-container">
                        <NavigationBar/>
                        <div className = "vd-form-box">
                            <h1>View Discussions</h1>
                            <div className = "parent_container" id = "parent_container" 
                                onLoad = {generate_containers()}>
                            </div>
                            <form onSubmit = {handleSubmit(create_answer_button)}>
                                <div className = "vd-input-group">
                                    <div className = "vd-input-field">
                                        <textarea
                                        type = "text"
                                        id = "answer_description"
                                        placeholder = "Type your answer here..."
                                        {...register("answer_description")}/>
                                    </div>
                                </div>

                                <div className = "vd-enter-btn">
                                    <button type = "submit" id = "create_button">SUBMIT ANSWER</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}


/* USING {} FOR HTML VARIABLES?
export default function ViewDiscussion() {
    async function addContainers() {
    }
    var random_thing = 0;
    return (
        <html lang = "en">
            <head>
            </head>
            <body>
                <div class = "container" id = {random_thing}>
                    {random_thing}
                </div>
            </body>
        </html>
    );
}
*/