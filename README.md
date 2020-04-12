# Playlist reporting for a radio station

## A TypeScript refactor of my [Full Stack Open](https://fullstackopen.com/en/) associated [project](https://github.com/teemukostamo/fullstack_harjoitustyo)

The subject of my project is to create a song reporting tool for a radio station. Radio stations are obliged to report the music they play to the music copyright holder organizations. The users of the application are the dj's and the employees of the station. The dj's report all the songs they play in their shows. The employees of the station make sure all the shows have been reported, and then forward all the reports to the copyright holder organizations in the [required format](https://www.gramex.fi//wp-content/uploads/2018/11/raportointiohje_kaupalliset_radiot_1_7_20091.pdf) on a monthly basis.

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
- To deploy the entire project to Heroku, run `npm run deploy:full` in the project root directory. This assumes you have set up Heroku for the repository.
- To run the backend tests, run `npm run test` in the project root directory
- To run the frontend tests, run `npm run test` in the frontend directory

### User manual

User manual is found [here](documentation/user_manual.md).

### Documentation

Documentation for developers is found [here](documentation/documentation.md).
