import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function createCourse() {
        if (!topic.trim()) {return;}
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic.trim(),
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Search failed");
            }
            const course = {
                id: crypto.randomUUID(),
                title: topic.trim(),
                resources: data.resources.map((resource) => ({
                    ...resource,
                    id: crypto.randomUUID(),
                    completed: false,
                })),
                createdAt: new Date().toISOString(),
            };
            const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
            localStorage.setItem("courses", JSON.stringify([...existingCourses, course]));
            navigate("/courses");
        } catch (error) {
            console.error(error);
            alert("Something went wrong while creating the course...");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="page">
            <h1>CourseBuilder</h1>
            <p className="subtitle">Learn anything using resources from across the web!</p>
            <div className="search-container">
                <input
                type="text"
                placeholder="What do you want to learn today?"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") createCourse();
                }}></input>
                <button onClick={createCourse} disabled={loading}>
                    {loading ? "Building..." : "Build Course"}
                </button>
            </div>
        </div>
    );
}
export default Home;