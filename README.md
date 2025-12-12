# Sales Analytics Dashboard #

The Brand Sales Analytics Dashboard is a powerful, interactive web application designed to analyze shoe brand performance across multiple metrics like sales, advertising cost, impressions, and clicks. Built using the MERN stack, this dashboard provides real-time filtering, dynamic visualization, and a detailed data table to help users make data-driven decisions.

__Features__

1. Date Range Filtering
2. Metric Summary Tiles
3. Interactive Line Chart (Chart.js)
4. Detailed Data Table

## Installation ##
1. __Clone the Repository:__
   ```
   https://github.com/Jaisilan7565/Sales-Analytics-Dashboard.git
   ```
2. __Navigate to the project directory:__
   ```
   cd ./Sales-Analytics-Dashboard
   ```
3. __Install backend dependencies:__
   ```
   cd ./backend
   npm install
   ```
4. __Install frontend dependencies:__
   ```
   cd ../frontend
   npm install
   ```
5. __Set up environment variables:__
   
-    Create a '.env' file in the backend directory and add the following:
   ```
   MONGODB_URL = <Use your MongoDB Connection String here.>
   PORT = <Enter your Required Port Number>
   ```
6. __Run the application:__
   
-    Start the backend server:
   ```
   cd ./backend
   node app.js
   ```

-   Start the frontend development server
   ```
   cd ../frontend
   npm run dev
   ```

## Usage ##
1. Open your browser and navigate to http://localhost:3000.

## Technologies Used ##
- MongoDB
- Express.js
- React.js
- Node.js
- Chart.js
- Tailwind CSS
