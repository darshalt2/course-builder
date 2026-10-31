# CourseBuilder
This is a web application where you can enter a topic you want to learn and get a generated course with relevant articles and videos.

# Tech Stack
**Frontend**
- React
- React Router
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- Brave Search API

### Prerequisites for installation
- Node.js and npm installed
- Brave Search API key

### Installation
1. Clone the repository:
```bash
git clone https://github.com/darshalt2/course-builder.git
```
2. Navigate into project directory and install dependencies:
```bash
cd course-builder
npm install
```
3. Create a .env file in the root directory and add your Brave Search API key there:
```env
BRAVE_SEARCH_API_KEY=your_api_key
```

### Running
Start the backend server:
```bash
npm run server
```
Start the frontend in a separate terminal:
```bash
npm run dev
```
Then, open the local URL provided by Vite.
