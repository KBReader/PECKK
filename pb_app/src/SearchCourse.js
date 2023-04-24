import pb from "lib/pocketbase";
import {useForm} from "react-hook-form";

export default function SearchCourse() {
    const {register, handleSubmit, reset} = useForm();

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
            }
            else {
                console.log('Course not found.');
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
                        <h1>Search for a Course</h1>
                        <form onSubmit={handleSubmit(search_button)}>
                            <div className="input-group">
                                <div className="input-field">
                                    <input type="text" id="course_subject" placeholder="Course Subject" {...register("course_subject")}/>
                                </div>

                                <div className="input-field">
                                    <input type="text" id="course_number" placeholder="Course Number" {...register("course_number")}/>
                                </div>
                            </div>

                            <div className="enter-btn">
                                <button type="submit" id="search_button">SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    );
}