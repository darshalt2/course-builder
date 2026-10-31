import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173"}));
app.use(express.json());
app.post("/api/search", async(req, res) => {
    const {topic} = req.body;
    if (!topic) {
        return res.status(400).json({
            error: "Topic is required",
        });
    }
    try {
        const searchQuery = `${topic} tutorial beginner guide`;
        const response = await fetch(
            `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchQuery)}&count=10`, {
                headers: {
                    Accept: "application/json",
                    "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY,
                },
            }
        );
        if (!response.ok) {
            throw new Error("Search API request failed");
        }
        const data = await response.json();
        const resources = data.web?.results?.map((result) => ({
            title: result.title,
            description: result.description,
            url: result.url,
        })) || [];

        res.json({
            resources,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Could not search the web.",
        });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`CourseBuilder API running on port ${PORT}`);
})