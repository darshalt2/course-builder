import {Link} from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar">
        <Link to="/" className="logo">CourseBuilder</Link>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/courses">My Courses</Link>
        </div>
        </nav>
    );
}
export default Navbar;