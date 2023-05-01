import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import NavigationBar from "NavigationBar";

// import "./pb_public/login_style.css";
// import "./pb_public/create_course_style.css";  TODO: create this css file
import "./pb_public/cc_style.css";

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
                
                // direct to new course page using new course's key
                const course = await pb.collection('courses').getFullList({
                    filter: `subject = "${course_subject.toLowerCase()}" && number = "${course_number.toLowerCase()}"`
                });

                localStorage.setItem('course_key', course[0].id);
                localStorage.setItem('current_page', 'ViewCourse');
                window.location.reload();
            }
            else {  // non-empty query -> course already exists
                console.log('This course already exists.');
                reset();
            }
        }
        catch (error) {
            console.log('Error: ', error);
        }

        reset();
    }

    return (
        <>
            <html lang = "en">
                <head>
                </head>
                <body>
                    <div className = "cc-container">
                        <NavigationBar/>
                        <div className = "cc-form-box">
                            <h1>Create New Course</h1>
                            <form onSubmit = {handleSubmit(create_button)}>
                                <div className = "cc-input-group">
                                    <div className = "cc-input-field">
                                        <input type = "text" id = "course_subject"
                                            placeholder = "Course Subject"
                                            {...register("course_subject")}/>
                                    </div>

                                    <div className = "cc-input-field">
                                        <input type = "text" id = "course_number"
                                            placeholder = "Course Number"
                                            {...register("course_number")}/>
                                    </div>

                                    <div className = "cc-input-field">
                                        <input type = "text" id = "course_name"
                                            placeholder = "Course Name"
                                            {...register("course_name")}/>
                                    </div>

                                    <div className = "cc-enter-btn">
                                        <button type = "submit" id = "create_button">CREATE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}