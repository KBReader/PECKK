import Auth from "Auth";
import Signup from "Signup";
import CreateCourse from "CreateCourse";
import CreateDiscussion from "CreateDiscussion";
import SearchCourse from "SearchCourse";
import ViewCourse from "ViewCourse";
import ViewDiscussion from "ViewDiscussion";

export default function App() {
    if (localStorage.getItem('current_page') === null) {
        localStorage.setItem('current_page', 'Auth');
    }

    if (localStorage.getItem('current_page') === 'Auth') {
        return (
            <>
                <Auth/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'Signup') {
        return (
            <>
                <Signup/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'SearchCourse') {
        return (
            <>
                <SearchCourse/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'CreateCourse') {
        return (
            <>
                <CreateCourse/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'ViewCourse') {
        return (
            <>
                <ViewCourse/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'CreateDiscussion') {
        return (
            <>
                <CreateDiscussion/>
            </>
        );
    }
    else if (localStorage.getItem('current_page') === 'ViewDiscussion') {
        return (
            <>
                <ViewDiscussion/>
            </>
        );
    }
}