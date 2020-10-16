# Playlist reporting for a radio station

## A TypeScript refactor of my [Full Stack Open](https://fullstackopen.com/en/) associated [project](https://github.com/teemukostamo/fullstack_harjoitustyo)

### Deployed application [here](https://playlist-demo.teemukostamo.com/)

The subject of my project is to create a song reporting tool for a radio station. Radio stations are obliged to report the music they play to the music copyright holder organizations. The users of the application are the dj's and the employees of the station. The dj's report all the songs they play in their shows. The employees of the station make sure all the shows have been reported, and then forward all the reports to the copyright holder organizations in the [required format](https://www.gramex.fi//wp-content/uploads/2018/11/raportointiohje_kaupalliset_radiot_1_7_20091.pdf) on a monthly basis.

### Install Instructions (app created with Node v12 & MySQL v5.7)

- Clone the repository
- Run `npm install` the project root directory
- `cd frontend` and run `npm install` in the frontend root directory
- Import data from `playlist-db.sql` into your MySQL database of choice. MySQL version 5.7. Use the default values described below if you wish to skip creating an `.env` file.
- Create an `.env` -file into the project root directory with the following values:
  - `PORT` - The port you wish to use for the server. Default port is 5000
  - `DB_URI` - Your DB URI. Default database location is `localhost`
  - `DB_NAME` - Your database name. Default database name is `playlist_demo`
  - `DB_SECRET` - Your database password. Default value is `salainen`
  - `DB_USER` - Your database username. Default value is `root`
  - `TEST_DB_NAME` - Your test database name. Default test database name is `playlist_test`
  - `SECRET` - Your jsonwebtoken secret. Default value is `unauthorized`
- To start the backend in development mode, run `npm run dev` in the project root directory
- To start the compiled build of the backend, run `npm start` in the project root directory
- To start the frontend, run `npm start` in the frontend directory
- To create a production build of the frontend, run `npm run build:ui` in the project root directory
- To run the backend tests, run `npm run test` in the project root directory
- To run the end to end test:

  - start the backend in test mode by running `npm run start:test` in the project root directory
  - `cd` into the frontend directory and run `npm start`
  - Open another terminal window in the frontend directory and run `npm run cypress:open`

- Use username `test` and password `test` to log in with administrator priviliges

### API Documentation

To use the API with Postman, set the following Postman environment variables:

- URL - the url where the backend is running, for example `localhost:5000`
- TOKEN - use Postman to login with valid credentials (username: test & password: test with the provided seed data), then set the returned token as the value of the TOKEN environment variable
- Set the request header key-value pairs for each request like so:
  | key | value |
  | :--------: | :----: |
  | Content-Type | Application/json |
  | Authorization | bearer {{TOKEN}} |

  [API documentation](https://playlist-demo.teemukostamo.com/backend-documentation)

### User manual

User logs in on the front page. After a successful login user may create a new report. Current user's reports with the status "In progress" are also visible.

## Creating a new report

A new report requires the following information:

- Program name
- Program number (found on the station's internal calendar)
- DJ's first name and last name
- Program date
- Program start time
- Program end time

If desired program is not found on the list of programs, the user may create a new program on the PROGRAMS page by clicking the "Add new program" -button. After the required info has been filled, "Continue" -button takes the user to the current report page where songs can be added.

## Adding songs to the report

It is possible to fetch the songs from the studio's playout software's playlog (Fetch tracks from log -button). Insert date and time to the form, and click fetch. For programs pre-recorded at the second studio, please select "2nd studio" from dropdown, and set the date and time for the time of recording.

If songs were played from a source other than the playout software, all songs must be added manually. "Quick search" -button enables user to search for tracks already in database. Search by track title or artist name. If the desired track is found with the quick search, clicking the search result and then clicking "Add track to report" adds the track to the report.

"Advanced search" -button takes the user to the advanced search page. Clicking the plus icon next to a search result adds the track in question to the current report. Current report is visible in the right side of the navbar.

If the desired track is not found in the database, "Add a new track" opens a form to add a new track to the database and to the current report.

Tick boxes on the left side of the list of songs select the songs for removal. "Remove selected" -button removes the selected songs from the report. The order of songs may be changed by dragging a track from the arrow icon. The blue edit icon on the right side opens a window where details of a song may be edited. The red x removes the track from the current report.

After all the tracks are added to the report, the status is set to "Ready" and "Save" -button is clicked. All the songs added to the report are saved automatically. Clicking save is necessary only after changing the status, date or time.

## Reports

Reports -page allows the user to browse all his/her reports by month. Filtering reports is possible by text, or by status (ready/in progress). The red x on the right deletes a report. Reports listed in blue are original broadcasts of a show, reports listed in red are re-runs.

## Current report

The latest opened report is the current report. The name and the date of this report is visible on the right side of the navbar. Songs added in the Top100 and Search pages go to this report.

## Search

Artists, albums and songs can be searched by text on the search page. By clicking the name of a song, artist or album the user is able to edit their info. The green + -icon on the right adds the track in question to the current report.

A green id-number is visible next to the name of an artist, album or a song. Clicking the id enables the user to remove a duplicate entry by merging the two entries.

## Top100

Top100 -page shows the one hundred most played songs, artists or albums and their play count in a period of time. Clicking the green + -icon adds the song in question to current report.

## User info and logout

Clicking the user's name in the navbar enables them to edit their personal info, change password or logout.

# User roles

The application has three user roles:

- DJ
- Staff
- Admin

## DJ

DJ is the basic user. They are allowed to create reports, browse their own reports, add and search for songs, and browse top100-lists.

## Staff

Staff-user has the same rights as DJ, and:

#### All reports by all users and duplicating reports

Staff-user may browse all reports by all users. If a show is re-aired, the original report of the show in question is duplicated, but with a new date and time, and the "Rerun" checkbox selected. Reruns are displayed in red on the reports page.

#### Programs

New programs may be added on the Programs page. Programs with active status are visible in front page's Create new report form's program listing.

## Admin

Admin has the same rights as Staff, and:

### Users

Create, edit, delete users. User status may also be set to Inactive. Incative users are displayed an error message on an attempt to log in.
