# Club Membership System

The Club Membership System is a project assignment as part of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only) that allows users to sign up, join a private club, create messages, and interact with other club members. It is a simple yet functional project that demonstrates user authentication, membership management, and role-based access control. The project utilizes Pug templates for rendering views.

![Project Screenshot](/screenshot.png)

## Features

- **User Authentication:** Users can sign up, log in, and securely authenticate using their email as a username and a password protected with bcrypt hashing.

- **Membership System:** Users are not automatically given membership status. Instead, they can join the club by entering a secret passcode. Once accepted, their membership status is updated.

- **Message Creation:** Authenticated users can create messages with a title, timestamp, and text. Messages are associated with their creators.

- **Privacy Control:** Messages are displayed on the home page, but only club members can see the author's name and the date of each message.

- **Admin Privileges:** An optional "Admin" field is available in the database. Admin users have the ability to delete messages and see all information, providing an extra layer of control.

## Usage

1. Sign up for an account using your email and password.
2. Join the club by entering the secret passcode.
3. Log in to access member-exclusive features.
4. Create new messages to share with other club members.
5. Admin users can delete messages from the platform.

## Technologies Used

- Node.js and Express.js for server-side development.
- MongoDB for database storage.
- Passport.js for user authentication.
- Bcrypt for password hashing and security.
- Pug templates for rendering views.
- HTML, CSS, and JavaScript for the frontend.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone repository_url_here`
2. Install dependencies: `npm install`
3. Set up environment variables `MONGODB_URL, MEMBERSHIP_CODE, PORT` to your desired values
4. Start the server: `npm start`
5. Access the application in your web browser at `http://localhost:port` (replace `port` with the port number specified in your environment).