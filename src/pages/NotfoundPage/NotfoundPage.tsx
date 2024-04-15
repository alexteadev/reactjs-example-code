import { NavLink } from 'react-router-dom';

function NotfoundPage() {
    return (
        <>
            Page not found
            <NavLink to="/">Go to Home Page</NavLink>
        </>
    );
}

export default NotfoundPage;