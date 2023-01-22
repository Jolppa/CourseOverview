# CourseOverview

I've used this project to become familiar with GraphQL and ApolloClient. In the future, I'll be using this project as a foundation for implementing and learning new libraries and techniques.

This is work in progress. Most of the basic functionalities are implemented (at least on the back-end), but not all (for now).

## Installation

Demo version:

- This version is not using MongoDB. Demo version is there for a quick showcase of the app and its functionalities.

1. Use the following command in both client and server folders:
```bash
npm install
```
2. Navigate to /CourseOverview/server/util and create a file called secret.env
   - In there you can determine the port you want the application back-end to run on by writing the following: PORT=YOURPORT, where the YOURPORT is the port, which you want to use. If not given, the port will default to 5000
     - Go to client/src/App.js and change the port variable to be your given port
3. Navigate to both the client and server folders and give the command:
```bash
npm start
```
4. The application should be running on default on http://localhost:3000

Database version:

1. Use the following command in both client and server folders:
```bash
npm install
```
2. Navigate to /CourseOverview/server/util and create a file called secret.env
   - In there you can determine the port you want the application back-end to run on by writing the following: PORT=YOURPORT, where the YOURPORT is the port, which you want to use. If not given, the port will default to 5000
     - Go to client/src/App.js and change the port variable to be your given port
   - Along side the port, you need to create a database in the mongodb website and find your URI for the database. Once you have it, write it down under the MONGO_URI variable. The value should be something like this: "mongodb+srv://USERNAME:PASSWORD@cluster0.x6hishj.mongodb.net/CO?retryWrites=true&w=majority"
3. Navigate to both the client and server folders and give the command:
```bash
npm start
```
4. The application should be running on default on http://localhost:3000

## Planned features

- [ ] Complete GRUD functionality on the front-end (Implementing React Router)

- [ ] Creating a Dark Mode for the app

- [ ] Expanding the level of information, that is given about the courses and exams (?)
