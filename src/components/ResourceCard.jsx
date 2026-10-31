function ResourceCard({resource, onToggle}) {
    function getResourceType(url) {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "YouTube Video";
        } else {
            return "Article/Website";
        }
    }
    return (
        <div className={`resource-card ${resource.completed ? "completed" : ""}`}>
        <div className="resource-info">
            <span className="resource-type">
                {getResourceType(resource.url)}
            </span>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
        </div>
        <div className="resource-actions">
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="open-button">Open Resource</a>
            <button className="complete-button" onClick={onToggle}>{resource.completed ? "Complete" : "Mark Complete"}</button>
        </div>
        </div>
    );
}
export default ResourceCard;