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

### HTMl deliverable
For this deliverable I built out the structure of my application using HTML.

- **HTML Pages** - Seven HTML pages that represent the ability to login, choice user type, create or enter a voting code, vote, and show results.
- **Links** - The login page automatically links to the user page, which links to the subseuqeunt code page, which links to the voting page.
- **Text** - Each of the voting choices is represented by a textual description.
- **Images** - I added images
- **DB/Login** - Input box and submit button for login. The voting winner represents data pulled from the database.
- **WebSocket** - 

### CSS deliverable

### JavaScript deliverable

### Service deliverable

### DB/Login deliverable

### WebSocket deliverable

### React deliverable
