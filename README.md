 Authentication & Security

This project is a Node.js API that demonstrates secure user authentication. It implements a signup and login flow using **bcrypt** for password hashing, ensuring that plaintext passwords are never stored in the database. 

## 🛠️ Tech Stack
*   **Node.js**
*   **Express.js**
*   **Bcryptjs** (for password hashing)

## 🚀 How to Run This Project Locally

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project folder.
3. Install the required dependencies:
   ```bash
   npm install
Start the server:

bash
node app.js
The server will run on http://localhost:3000.

🧪 API Endpoints & Testing
You can test these endpoints using Postman or cURL.

1. Signup
Endpoint: POST /signup

Body (JSON):

json
{
  "email": "test@example.com",
  "password": "MySecret123"
}
Result: Creates a user and stores only the hashed version of the password.

2. Login (Success)
Endpoint: POST /login

Body (JSON):

json
{
  "email": "test@example.com",
  "password": "MySecret123"
}
Result: 200 OK - {"message": "Login successful"}

3. Login (Failure - Wrong Password)
Endpoint: POST /login

Body (JSON):

json
{
  "email": "test@example.com",
  "password": "WrongPassword"
}
Result: 401 Unauthorized - {"error": "Invalid credentials"}

📝 Assignment Requirements & Notes
1. Plaintext vs. Stored Hash Comparison
Here is the proof that the password is not stored as plaintext in the database:

Plaintext password used during signup: MySecret123

Actual value stored in the database: $2b$10$RJmk1RjkEa2ubP/rEDV5g.K3dboXAAD5DiakcWnt8UiJhj0930XLy

Why this proves the password is safely hashed:
As you can see, the stored value looks nothing like the original password. It is a long, random string of characters. The $2b$ at the beginning tells us it is a bcrypt hash, and the 10 is the work factor. If a hacker stole this database, they would not be able to "decrypt" this string back into MySecret123.

2. Hashing vs. Encryption Note
Why Hashing is the Correct Choice for Passwords:
When we store user passwords, we should use hashing. Hashing is a one-way mathematical function. It takes an input (the password) and turns it into a fixed-length string (the hash). You can never reverse a hash to get the original password back.

When a user logs in, we don't need to know their password; we only need to verify that the password they just typed matches the one they signed up with. We do this by hashing the new attempt and comparing it to the stored hash. If they match, the password is correct.

Why Encryption is the Wrong Choice:
Encryption is a two-way process. If you encrypt a password, you can decrypt it later using a "key." This is dangerous because if a hacker steals your database and your encryption key, they can instantly decrypt every single user's password and read them in plain text. For passwords, you should never want to be able to read the original text.

The Importance of Salt and Work Factor:

Salt: Bcrypt automatically adds random data (a salt) to the password before hashing. This ensures that even if two users pick the exact same password (e.g., "password123"), their stored hashes will look completely different. This stops hackers from using pre-computed "rainbow tables" to crack passwords instantly.

Work Factor: Bcrypt uses a tunable setting (like the 10 in our code) that makes the hashing process deliberately slow. This means if a hacker steals the database, trying to guess billions of passwords becomes incredibly slow and impractical for them.

3. Sessions vs. JWT Explanation
How Sessions Work:
When a user logs in using sessions, the server verifies their password and creates a unique "Session ID." The server saves this ID in its own database and sends it back to the user's browser as a cookie. On every subsequent request, the server looks up the Session ID in its database to see who the user is. The state is kept entirely on the server.

How JWT (JSON Web Tokens) Work:
When a user logs in using JWT, the server verifies their password and creates a token containing the user's data, signed cryptographically. The server does not save this token. The user sends the token back on every request, and the server simply verifies the signature to trust the user. The state is kept entirely inside the token on the client side.

When to choose Sessions:
I would choose sessions for a banking application. In these systems, security is critical, and we need the ability to instantly revoke a user's access. If an account is compromised, we can instantly log them out by deleting their Session ID from the server's database. With JWT, the token is valid until it expires, meaning we'd have to build a complex "denylist" to block them.

When to choose JWT:
I would choose JWT for a mobile app that needs to scale across multiple servers. Because JWT is stateless, the server doesn't need to do a database lookup on every request. This makes the app much faster, and any server can verify the token without needing to share a central database.# Sessions-vs-JWT-Password-Hashing
