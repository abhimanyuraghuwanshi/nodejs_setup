#Overview
This project is a Node.js application that serves as a robust foundation for building APIs. It includes features such as nested routing, middleware for validation, standardized response components, enhanced security practices, file handling using Multer, JWT for user authentication, MySQL as a database with SQL injection checks, CORS for security, API rate limiting, Morgan logs for easy backtracking, and optional Web3 support for blockchain-based login.


#Features
*Nested Routing: Organize your API routes efficiently with nested routing for better path management.
*Middleware for Validation: Implement middleware to handle request validation, ensuring data integrity and security.
*Common Response Components: Maintain a consistent and standardized response format for improved API clarity.
*Epoch/Unix Time: Utilize epoch/unix time for secure timestamping, preventing time alteration.
*Multer for File Handling: Easily handle file uploads and management with Multer.
*JWT Authentication: Implement JSON Web Tokens for user authentication, ensuring a single login per user.
*MySQL Database: Use MySQL as a reliable database with SQL injection checks in place.
*CORS Protection: Enhance security by preventing external API calls with CORS configuration.
*API Rate Limiting: Implement rate limiting to thwart brute force attacks and enhance security.
*Morgan Logs: Leverage Morgan logs for effective backtracking and debugging.
*Optional Web3 Support: Integrate Web3 for blockchain-based login as an optional authentication method.


#Prerequisites

For .env setup :-
PORT = number
JWTSECRETKEY= string
JWTSECRETKEYADMIN= string
JWTSESSIONTIMEOUT= 24h
JWTSESSIONTIMEOUTFORAPP= 365d
MYSQLPORT= number
DATABASE= string
DBPASSWORD= string
DBUSER= string
MYSQLHOST= string
ALLOWED_ORIGINS= http://localhost:3000,http://localhost:3001,http://localhost:3002
LOGINKEY= string
#PRIVATEKEYFORLOGIN= string-address
#AES_KEY= string


#start with nodemon use =>  npm start 
