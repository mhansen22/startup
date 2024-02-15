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
- [x] - done - 10% Responsive to window resizing. Looks great on all mediums.
- [x] - done - 20% Application elements. Buttons are responsive and link to the correct pages. User can select vote and enter in access code. Uses good contrast. Pages are standardized.
- [x] - done - 10% Application text content. Text is displayed using the Arial, sans-serif font. (Consistent).
- [x] - done - 10% Application images. I made the images blend seemlessly with the background. The photos add dimension to the application styling.

### JavaScript deliverable

### Service deliverable

### DB/Login deliverable

### WebSocket deliverable

### React deliverable
