# Npm packages which is instale in this project.

1. bcrypt:- “I use bcrypt to hash user passwords during registration and compare them during login to ensure secure authentication.”

2. cloudinary:- “I integrated Cloudinary to handle user-uploaded images efficiently, including resizing and format optimization.”

3.  dotenv:- “I use dotenv to keep sensitive data like API keys and database credentials secure and out of my codebase.”

4. cors:- * CORS allows your frontend and backend to talk to each other if they are on different domains or ports.
          * I use CORS middleware to allow my frontend and backend to communicate securely across different domains.


5. express:- “I use Express to set up RESTful APIs, handle routing, middleware, and manage the overall backend architecture.”

6.  jsonwebtoken (JWT):-  “I use JWT to issue secure tokens after user login, allowing protected route access and user verification.

7.  mongoose:- “I use Mongoose to define schemas and interact with MongoDB in an object-oriented way, which helps manage data efficiently.”

8. multer:- * “I use Multer to handle file uploads in the backend, especially for images or documents.”
            * Multer is used when you want users to upload files (like images or PDFs) from a form in your frontend to your backend.

9.  nodemon:- “I use Nodemon in development to streamline the workflow by avoiding manual server restarts on each change.”

10.  validator:- * "I use the Validator library to check user input on the server side, like validating emails and strong passwords."
                 * Validator helps to check if user input is correct or clean, like:
                    - Is email format valid?
                    - Is the password strong?
                    - Is the input empty?


11. razorpay :- for the online payment.The razorpay npm package is the official Node.js SDK provided by Razorpay, a popular Indian payment gateway. It's used to integrate payment functionality into a backend server (usually built with Node.js and Express).

          
     # Interview line :- We used the razorpay npm package on the backend to securely integrate Razorpay payments. It allowed us to create orders, verify payment signatures, and manage transactions without directly handling HTTP calls. It improves security and simplifies integration with Razorpay’s API.







# Content of all the folders 

1. Config folder:- * A config (configuration) file is used to store important settings or reusable values that your backend project needs —                    instead of hardcoding them in multiple places.
                   * It contain multiple configuration file like mongoDb config , cloudinary config.

   # Interview Line:- "I keep reusable configuration like database setup, cloud keys, and third-party service configs in a dedicated config folder to keep the backend clean and maintainable.

2. Controllers folder :- * In this folder we will create multiple controller function that will be main logic for the API's.
                         * The controllers folder contains files that define the logic for handling API requests — basically, what should happen when a user hits a certain route.

    # Interview Line:- "I separate request logic into controller files to follow a modular structure. This keeps my route files clean and improves maintainability."

3. MiddleWare folder:- * In this folder we  will create the custom middleware to autheticate the users and for the other feature.

    # Interview Line:- "I use middleware to handle things like authentication, logging, and error handling in a reusable and organized manner. It helps keep my route handlers clean and modular."

