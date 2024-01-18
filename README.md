## Specification Deliverable

### Elevator pitch
Are you tired of spending more time debating with friends about which movie to watch than actually enjoying the movie itself? Here’s a movie voting application to streamline your decision--making process and eliminate arguments! Just answer four quick questions: What genre? What time period? What age rating? What length? Then, the app will generate the top five rated films from IMDB that meet your specific criteria. Each member of your group then gets to cast their vote for their preferred movie. The app automatically tallies the votes and displays the results in real time for everyone to see. With a clear consensus, you can confidently choose the movie that the majority of your group is excited to watch. Movies are for entertainment, not endless decision-making – let this app bring the joy back to your movie nights!

### Design

### Key features

- Secure login over HTTPS
- Ability to select the genre, time period, age rating, and length.
- Display of choices
- Ability to select, and change, top two choices
- Totals from all users displayed in realtime
- Ability for a user to lock in their top two
- Results are persistently stored
- Ability for admin to select and choose genre, time period, age rating, and length.

### Technologies

I am going to use all the required technologies in these ways:

- HTML: Use correct HTML structure for application. Two HTML pages. One for login and one for voting. Hyperlinks to choice artifact.
- CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- JavaScript - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.
- Service - Backend service with endpoints for:
    * login
    * retrieving choices
    * submitting votes
    * retrieving vote status
- DB/Login - Store users, choices, and votes in database. Register and login users. Credentials securely stored in database. Can't vote unless authenticated.
- WebSocket - As each user votes, their votes are broadcast to all other users.
- React - Application ported to use the React web framework.

## DO NOT EDIT YET --

### HTMl deliverable

### CSS deliverable

### JavaScript deliverable

### Service deliverable

### DB/Login deliverable

### WebSocket deliverable

### React deliverable
