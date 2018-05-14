# NodeJsRESTfulWebServiceMongoDB
A Node js based RESTful Web service using Mongo DB

Hello,

Thank you for providing me with this opportunity to share my code with you. I've tried to keep it as clean and self-explanatory as I can.
Hope that helps! Having said that let me share you the details about my assignment and the thinking behind choosing its architecture:

1. (a) I have used Node.js with Express as the framework to build my RESTful web service. Node.js has a light-weight syntax which helped me
       in building this web service quite faster.
   (b) The Express framework is a very useful tool in creating routes and controllers in my project. It mainly provides a lot of 
       features and helps Node.js in working with web/mobile applications. I chose to use Express with an intention that this project
       can be scaled to a higher level, in future, if necessary.
       
2. I have used MongoDB Atlas which is a cloud based database service provided by Mongo DB. A couple of advantages that convinced me to use this:

   (a) Since it is a NoSQL database, the amount of query creation and query updation code was reduced by almost 50-60%. This helped me in
       faster development.
   (b) MongoDB Atlas is powered by AWS, which has a great feature of pay-per-use. If there is a possibility of scaling this project,
       a cloud based database is easier to use in terms of transactions as well as cost-cutting.
     
3. I have used JSON Web Tokens for the token authentication system for the login, logout method. Each user will be provided with a token
   having an expiry time, which will be its session time. The user can use this token to perform operations such as -
   (a) Updating user information viz. name, password
   (b) Deleting the user profile
   (c) Logging out of the system
   In the current scenario, since my project is a web service there is no browser that will store the token. The token is stored in the database
   to maintain the status of the user as logged in or not. Once this web service is used to connect to a web/mobile application, the same
   token can be used to be stored in the browser at the client side. In this way, it will provide reliable security and ease of use.
   
 4. Following are some of the utilities that I used which proved to be of great help while coding:
    (a) body-parser: Helped me in retrieving specific data from the body of the request.
    (b) morgan: Helped me in logging http request, response for better debugging.
    (c) bcrypt: Helped me in creating strong hash values of passwords entered by new users during registration.
    
 5. This is the last and, probably, the best utility that helped me while I was coding - mongoose. Mongoose helped me a lot in creating,
    saving, updating and deleting data from the database by using its inbuilt methods such as mongoose.Schema(), mongoose.model() and 
    its .save(), .findByIdAndRemove(). This utility proved to be of immense help especially when I saw a lot of boilerplate code
    while using mongoDBClient initially. It provides a rigorous and efficient modeling environment for data enforcing on MongoDB.
   
In addition to that I used node package manager to install libraries and utilities which made it very simple for me. I sincerely
thank the genius minds who have contributed in making these utilities and frameworks easily available to people, with less to 
no complexity. I hope I was effective in conveying my thoughts. All other details will be provided in the other files.

Thank you!
Mihir
