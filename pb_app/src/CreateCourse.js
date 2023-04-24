import pb from "lib/pocketbase";
import {useForm} from "react-hook-form";

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

            if (search.length === 0) {
                const data = {
                    "subject": course_subject.toLowerCase(),
                    "number": course_number.toLowercase(),
                    "name": course_name,
                    "username": pb.authStore.model.username,
                };

                await pb.collection('courses').create(data);
                document.open();
                document.write('new course created.');
                console.log('New course created.');
            }
            else {
                document.open();
                document.write('This course already exists.');
                console.log('This course already exixts.');
            }
        }
        catch (error) {
            console.log('Error: ', error);
        }

        reset();
    }

    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <div className="container">
                    <div className="form-box">
                        <h1>Create New Course</h1>
                        <form onSubmit={handleSubmit(create_button)}>
                            <div className="input-group">
                                <div className="input-field">
                                    <input type="text" id="course_subject" placeholder="Course Subject" {...register("course_subject")}/>
                                </div>

                                <div className="input-field">
                                    <input type="text" id="course_number" placeholder="Course Number" {...register("course_number")}/>
                                </div>

                                <div className="input-field">
                                    <input type="text" id="course_name" placeholder="Course Name" {...register("course_name")}/>
                                </div>
                            </div>

                            <div className="enter-btn">
                                <button type="submit" id="create_button">CREATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    );
}