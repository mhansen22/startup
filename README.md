# Movie Selector

## Specification Deliverable

### Elevator pitch
Are you tired of spending more time debating with friends about which movie to watch than actually enjoying the movie itself? Here’s a movie voting application to streamline your decision and eliminate arguments! Just answer four quick questions: What genre? What time period? What age rating? What length? Then, the app will generate the top five rated films from IMDB that meet your specific criteria. Each member of your group then gets to cast their vote for their preferred movie. Once everyone votes the app automatically tallies the votes and displays the results in real time for everyone to see. With a clear consensus, you can confidently choose the movie that the majority is excited to watch. Movies are for entertainment, not endless decision-making – let this app bring the joy back to your movie nights!

### Design
![Photo of Startup Application Design](images/IMG_7624.png)

### Key features
- Login page: keeps application and voting secure.
- Admin answers four questions (What genre? What time period? What age rating? What length?) to narrow down movie options.
- Users can select one of the five movies listed to vote.
- The five movies listed will be the top five rated for the specifications/questions.
- Results are shared on end result page.
- Results will show the movie with the most votes and the runner up, including the amount of votes each movie got.
- Results are stored.

### Technologies
This is how I will implement the technologies required:

- HTML: 
    * Objective: Structure the login, question, voting, and result pages.
    * Explanation: Define the fundamental layout and elements for these pages using HTML.
- CSS:
    * Objective: Style all pages for aesthetic appeal and to fit all screen sizes.
    * Explanation: Use CSS to enhance the visual appearance of all pages. This includes adding colors, borders, spacing, and other design elements to make it attractive and user-friendly.
- JavaScript:
    * Objective: Implement user interaction for login, questions, and voting.
    * Explanation: Use JavaScript to add functionality to the pages. This means enabling users to log in on the first page and select a movie to vote for. It also allows admin to answer the four questions.
- Service: 
    * Objective: Set up web service endpoints for movie data.
    * Explanation: Develop web service endpoints to retrieve movie data from IMDB and provide this data to the application. 
    * Also: Backend service with endpoints for login, retrieving choices, submitting the votes, and retrieving the vote status.
- Database/Login:
    * Objective: Implement authentication in the database.
    * Explanation: Store user authentication details (username and password) in a database. Authenticate users during the login process, enhancing security and controlling access to the application.
    * Also: store the users, choices, and votes in database.
- WebSocket: 
    * Objective: Have real-time updates with WebSocket.
    * Explanation: Use WebSocket to push real-time updates from the server. Relay movie voting tallies as they happen, which gives users  immediate feedback on the voting results.
- React: 
    * Objective: Use React for the web framework.

### HTML deliverable
I built out the structure of my application using HTML -

- **HTML Pages** - Seven HTML pages that represent the ability to login, choose user type, create or enter a session code, narrow down movie options, vote, and show results.
- **Links** - The login page automatically links to the user page, which links to the subseuqeunt access code page (based on whether the user is an admin or guest), which links to the voting page, which links to the results page.
- **Text** - The movie winner and runner up are represented by a textual description, as well as the number of votes each got. (All seven pages have text, either placeholder or intructions for the user)
- **Images** - I added two images (mainly placeholder for now). One is at the start on the index page and the other is at the end on the results page. This makes my application more interesting and visually appealing.
- **DB/Login** - Input boxes and submit button for login. The votes for the winner and runner up represent data pulled from the database. The database stores the users, choices, and votes. (Used radio form for choices and votes)
- **WebSocket** - The count of the votes represent the number of real time votes.

### CSS deliverable
I styled my application using CSS - 

- [x] - done - Prerequisite: Simon CSS deployed to my production environment.
- [x] - done - Prerequisite: A link to my GitHub startup repository prominently displayed on my application's home page (and all pages).
- [x] - done - Prerequisite: Notes in my startup Git repository README.md file (here).
- [x] - done - 30% Header, footer, and main content body. Used flex to layout sections.
- [x] - done - 20% Navigation elements. Links (Github and home) highlight on hover.
- [x] - done - 10% Responsive to window resizing. Looks great on all mediums. Footer disapears when page gets too small for all pages. Buttons and text re-center and change size when page gets too small.
- [x] - done - 20% Application elements. Buttons are responsive and link to the correct pages. User can select vote and enter in access code. Uses good contrast. Pages are standardized.
- [x] - done - 10% Application text content. Text is displayed using the Arial, sans-serif font. (Consistent).
- [x] - done - 10% Application images. I made the images blend seemlessly with the background. The photos add dimension to the application styling.

### JavaScript deliverable

With JavaScript I implemented the application to work for a single user. I also added placeholders for future technology.

- [x] - done - Login - When you press "Login"/"Create Account" it takes the user to the next page (user page). It also saves the username to local storage and makes the username show up on every page in navbar. (Password is saved in variable, it will be hashed sent to the server for authentication later)
- [x] - done - Database - Displays movie winner and runner-up, as well as the number of votes each got up on result page (last page). Currently this is stored and retrieved from local storage, but it will be replaced with the database data later. Also the movies in the voting page are stored in local storage and later be replaced by Database data.
- [x] - done - WebSocket - Right now I set a temporary array of objects as the movies and votes, which is displayed in the results page. This will be replaced with WebSocket message later. The movie winner and votes changes as users submit their votes with a function like updateUI(votingData) once I implement websocket. (It's set up as a placeholder for now)
- [x] - done - Application Logic - The access code for the admin is randomly generated using JavaSript. Also, it is stored in local storage. There is JavaScript to check to make sure the adminCode and accessCode are the same. (will store and check in DB later too).

### Service deliverable

For this deliverable I did Backend web service support and interaction (to handle voting data):

- [x] - done - Node.js/Express HTTP service - I created an HTTP service using Node.js and Express
- [x] - done - Static middleware for frontend - Served the frontend using Express's express.static('public').
- [x] - done - Calls to third party endpoints - My backend fetches movie data from the TMDB API, while frontend triggers these backend calls.
- [x] - done - Backend service endpoints - Created a /api/movies backend endpoint to retrieve and serve movie data.
- [x] - done - Frontend calls service endpoints - The frontend makes calls to the backend's /api/movies to get movie data, showing the interaction between frontend and backend.

### DB/Login deliverable

For this deliverable I made functionality for the user to login/create an account. I also associated the votes with the logged in user. I stored the votes in the database!

 - [x] - done - MongoDB Atlas database created - done!
 - [x] - done - Stores data in MongoDB - done!
 - [x] - done - User registration - Creates a new account in the database.
 - [x] - done - existing user - Stores the votes under the same user if the user already exists.
 - [x] - nope - Use MongoDB to store credentials - Stores both user and their votes.
 - [x] - done - Restricts functionality - You cannot vote until you have logged in. This is restricted on the frontend because you cannot access the other pages until you have logged in. This is restricted on the backend because all actions require verification of the user's session token, which is checked with active sessions in database. Unauthorized requests without session token are not allowed to vote. Also, the prexisting vote is replaced with new vote if the user is an existing user (signing in rather than creating a new account).

### WebSocket deliverable

### React deliverable
