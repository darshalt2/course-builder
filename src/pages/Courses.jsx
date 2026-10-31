import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
function Courses() {
    const [courses, setCourses] = useState(() => {
        return JSON.parse(localStorage.getItem("courses") || "[]");
    });

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);

    function toggleResource(courseId, resourceId) {
        setCourses((previousCourses) => previousCourses.map((course) => {
            if (course.id !== courseId) return course;
            return {
                ...course,
                resources: course.resources.map((resource) => {
                    if (resource.id !== resourceId) return resource;
                    return {
                        ...resource,
                        completed: !resource.completed,
                    };
                }),
            };
        }));
    }

    function deleteCourse(courseId) {
        const confirmed = window.confirm("Are you sure you want to delete this course?");
        if (!confirmed) return;
        setCourses((previousCourses) => previousCourses.filter((course) => course.id !== courseId));
    }

    return (
        <div className="page">
            <div className="courses-header">
                <div>
                    <h1>My Courses</h1>
                </div>
                <Link to="/" className="create-course">+ Create New Course</Link>
            </div>
            {courses.length === 0 ? (
                <div className="empty-state">
                    <h2>No courses yet</h2>
                    <p>Start learning something new by creating your first course!</p>
                    <Link to="/" className="create-course">Build a Course</Link>
                </div>
            ): (
                <div className="courses">
                    {courses.map((course) => {
                        const completed = course.resources.filter((resource) => resource.completed).length;
                        const total = course.resources.length;
                        const percentage = total === 0 ? 0 : Math.round((completed/total)*100);
                        const isComplete = total > 0 && completed === total;
                        return (
                            <div className="course-card" key={course.id}>
                                <div className="course-heading">
                                    <div>
                                        <h2>{course.title}</h2>
                                        <span className={isComplete ? "course-status complete" : "course-status"}>{isComplete ? "Complete" : "In Progress"}</span>
                                    </div>
                                    <button className="delete-button" onClick={() => deleteCourse(course.id)}>Delete</button>
                                </div>
                                <div className="progress-info">
                                    <span>{completed} of {total} resources completed</span>
                                    <span>{percentage}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: `${percentage}%`}}/>
                                </div>
                                <div className="resource-list">
                                    {course.resources.map((resource) => (
                                        <ResourceCard key={resource.id} resource={resource} onToggle={() => toggleResource(course.id, resource.id)}/>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default Courses;