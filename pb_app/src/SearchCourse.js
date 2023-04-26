import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import NavigationBar from "NavigationBar";

// import "./pb_public/login_style.css";
// import "./pb_publc/view_discussion_style.css";  TODO: create this css file

export default function SearchCourse() {
    const {register, handleSubmit, reset} = useForm();
    // localStorage.setItem('course_key', null);

    async function search_button(data) {
        const course_subject = data.course_subject;
        const course_number = data.course_number;

        const search_filter = `subject = "${course_subject.toLowerCase()}"
                            && number = "${course_number.toLowerCase()}"`
        
        try {
            const search = await pb.collection('courses').getFullList({
                filter: search_filter,
            });

            if (search.length !== 0) {
                console.log('Course found.');
                const course_key = search[0].id;
                localStorage.setItem('course_key', course_key);
                localStorage.setItem('current_page', 'ViewCourse');
                window.location.reload();
            }
            else {
                console.log('Course not found.');
                reset();
                // show error msg in window
            }
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }

    async function create_course_button() {
        localStorage.setItem('current_page', 'CreateCourse');
        window.location.reload();
    }
    
    return (
        <>
            <NavigationBar/>
            <html lang = "en">
                <head>
                </head>
                <body>
                    <div className = "container">
                        <div className = "form-box">
                            <h1>Search for a Course</h1>
                            <form onSubmit = {handleSubmit(search_button)}>
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
                                </div>
    
                                <div className = "enter-btn">
                                    <button type = "submit"
                                            id = "search_button">SEARCH</button>
                                </div>
                            </form>
                            <div className = "container">
                                <button id = "create_course_button" onClick = {create_course_button.bind(this)}>CREATE COURSE</button>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}