<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

So that you can get data from an api sent to the browser that will persist after requests. Also allows user to avoid re-entering credentials every time a client makes a request to a server.

2. What does bcrypt do to help us store passwords in a secure manner.

Bcrypt hashes passwords sent to the client so that the password is inaccessible even on the database it is being stored in

3. What does bcrypt do to slow down attackers?

Bcrypt makes it so that is impossible to use any sort of key to gain access to passwords stored on a database. So if a database is compromised, hackers will have to decrypt the hash instead of just finding a key that matches if it was encrypted

4. What are the three parts of the JSON Web Token?
The three parts of a JSON Web Token are the header,payload, and signature. The header contains the algorithm with the token type. The payload holds information regarding permissions
