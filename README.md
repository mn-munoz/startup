# startup

[Notes](notes.md)

# Idea pitch

If you are someone creative and enjoys character creation, it might be hard to know how many characters you have and their information. My idea is to make it possible for people to create a gallery of *cards* that hold the information of characters to make it easier to organize and visualie to  you. 

## Design

![Picture displaying possible design of website](design-picture.jpg)

## Key Features

- Secure Login over HTTPS.
- Ability to create and delete character cards.
- Ability to edit character cards informtion.
- Ability to do basic costumatization on cards.
- Ability to show when another user has created a character card.


## Technologies

- HTML: Uses correct HTML structure. Includes two pages: one for login and one including the character gallery (this might change in the future)
- CSS: Uses valid CSS and preferably will include a responsive design
- Javascript: Provides login, complex design things that cannot be done with pure css, and backend endpoints. (this might change in the future)
- Service: Backend endpoitns for: 
    * Login
    * Getting data for cards
    * Notifiying if new character was created by someone
- DB/Login: Store, register, and login users. Credentials securly stored in database. Can't create character cards unless authenticated
- React: Application Uses Reach framework

## HTML

Structure of program is form by:

- HTML PAGES: One for login and one for the character gallery
- Character Card component: structure to hold the basic description of character 
- Text: each card with the basic description tht the card contains
- DB/Login: input and submit button for login
- Websocket: displays if other users have submited a character

## CSS

Stylizitation of page is form by:

- selected color pallet for webpage - to have consistent look
- Responsive design - web respons to diferent window sizes (Desktop, mobile, and tablet)
- Typography - Clear and redable fonts with appropirate spacing between font letters, lines, and whitespaces
- Style consistancy - Make code and webpage apperiance be consistent. Make design be clear and simple for the User

## Javascript

Honestly this is a work in progress. I need to learn more javascript to know how to use it in the project but this is an idea:

- login - onece you login you enter the character gallery
- database - display the character cards of the specific user
- Websocket - shows when another user has created a character card

## Service Deliverance

- Node.js/Express HTTP service - Not started
- Static middleware for frontend - Not started
- Calls to third party endpoints - Not started
- Backend service endpoints - Not started
- Frontend calls service endpoints - Not started

## DB/Login

- MongoDB Atlas database created - Not started
- Stores data in MongoDB - Not started
- User registration - Not started
- existing user - Not started
- Use MongoDB to store credentials - Not started
- Restricts functionality - Not started

## WebSocket deliverance

- Backend listens for WebSocket connection -  Not Started
- Frontend makes WebSocket connection - Not Started
- Data sent over WebSocket connection -  Not Started
- WebSocket data displayed - Not Started

## React Deliverance 

- Bundled and transpiled -  Not started
- Components -  Not started
- Router - Not started
- Hooks -  Not started