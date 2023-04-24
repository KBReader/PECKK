import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";

import "./pb_public/login_style.css";
// import "./pb_public/create_course_style.css";  TODO: create this css file

export default function CreateCourse() {
    const {register, handleSubmit, reset} = useForm();

    async function create_button(data) {
        const course_subject = data.course_subject;
        const course_number = data.course_number;
        const course_name = data.course_name;

        const search_filter = `subject = "${course_subject.toLowerCase()}"
                            && number = "${course_number.toLowerCase()}"`;

        try {
            const search = await pb.collection('courses').getFullList({
                filter: search_filter,
            });

            if (search.length === 0) {  // empty query -> course is new
                // create new 'courses' record using provided data

                const data = {
                    "subject": course_subject.toLowerCase(),
                    "number": course_number.toLowerCase(),
                    "name": course_name,
                    "username": pb.authStore.model.username,
                };

                await pb.collection('courses').create(data);
                document.open();
                document.write('New course created.');
                console.log('New course created.');
            }
            else {  // non-empty query -> course already exists
                document.open();
                document.write('This course already exists.');
                console.log('This course already exists.');
            }
        }
        catch (error) {
            console.log('Error: ', error);
        }

        reset();
    }

    return (
        <html lang = "en">
            <head>
            </head>
            <body>
                <div className = "container">
                    <div className = "form-box">
                        <h1>Create New Course</h1>
                        <form onSubmit = {handleSubmit(create_button)}>
                            <div className = "input-group">
                                <div className = "input-field">
                                    <input type = "text" id = "course_subject"
                                           placeholder = "Course Subject"
                                           {...register("course_subject")}/>
                                </div>

                                <div className = "input-field">
                                    <input type = "text" id = "course_number"
                                           placeholder = "Course Number"
                                           {...register("course_number")}/>
                                </div>

                                <div className = "input-field">
                                    <input type = "text" id = "course_name"
                                           placeholder = "Course Name"
                                           {...register("course_name")}/>
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
    );
}