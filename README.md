# Playlist reporting for a radio station

## A TypeScript refactor of my [Full Stack Open](https://fullstackopen.com/en/) associated [project](https://github.com/teemukostamo/fullstack_harjoitustyo)

### Install Instructions

- Clone the repository
- Run `npm install` the project root directory
- `cd frontend` and run `npm install` in the frontend root directory
- Import data from `playlist-db.sql` into your MySQL database of choice.
- Create a `.env` -file into the project root directory with the following values:
  - `PORT` - default port is 5000
  - `DB_URI` - default database location is `localhost`
  - `DB_NAME` - default database name is `playlist_demo`
  - `DB_SECRET` - your database password
  - `DB_USER` - your database username
  - `TEST_DB_NAME` - default test database name is `playlist_test`
  - `SECRET` - your jsonwebtoken secret
- To start the backend in development mode, run `npm run dev` in the project root directory
- To start the compiled build of the backend, run `npm start` in the project root directory
- To start the frontend, run `npm start` in the frontend directory
- To create a production build of the frontend, run `npm run build:ui` in the project root directory
- To deploy the entire project, run `npm run deploy:full` in the project root directory
- To run the backend tests, run `npm run test` in the project root directory
- To run the frontend tests, run `npm run test` in the frontend directory
