import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import NavigationBar from "NavigationBar";

// import "./pb_public/login_style.css";
// import "./pb_public/create_discussion_style.css";  TODO: create this css file

var course_key = localStorage.getItem('course_key');

export default function CreateDiscussion() {
    const {register, handleSubmit, reset} = useForm();

    async function create_button(data) {
        const discussion_title = data.discussion_title;
        const question_description = data.question_description;

        try {
            const discussion_data = {
                "course_key": course_key,
                "title": discussion_title,
            };

            await pb.collection('course_discussions').create(discussion_data);
        }
        catch (error) {
            console.log('Error creating discussion: ', error)
        }

        try {
            const discussion_record = await pb.collection('course_discussions')
            .getFullList({
                filter: `title = "${discussion_title}"`,
            });

            const discussion_key = discussion_record[0].id;

            const question_data = {
                "discussion_key": discussion_key,
                "description": question_description,
                "username": pb.authStore.model.username,
            };

            await pb.collection('discussion_posts').create(question_data);
            
            // direct to new discussion page using new discussion's key
            localStorage.setItem('discussion_key', discussion_key);
            localStorage.setItem('current_page', 'ViewDiscussion');
            window.location.reload();
        }
        catch (error) {
            console.log('Error creating question: ', error)
        }

        reset();
    }

    return (  // TODO: replace textarea (question box) with new class name
        <>
            <NavigationBar/>
            <html lang = "en">
                <head>
                </head>
                <body>
                    <div className = "container">
                        <div className = "form-box">
                            <h1>Create Discussion</h1>
                            <form onSubmit = {handleSubmit(create_button)}>
                                <div className = "input-group">
                                    <div className = "input-field">
                                        <input type = "text" id = "discussion_title"
                                            placeholder = "Discussion Title"
                                            {...register("discussion_title")}/>
                                    </div>

                                    <div className = "input-field">
                                        <textarea
                                        type = "text"
                                        id = "question_description"
                                        placeholder = "Enter your question here..."
                                        {...register("question_description")}/>
                                    </div>
                                </div>

                                <div className = "enter-btn">
                                    <button type = "submit"
                                            id = "create_button">CREATE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}