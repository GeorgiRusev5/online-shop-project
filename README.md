# online-shop-project
This is a NodeJS/Express web application with vanilla JS on the front-end. It was made during the "100 days of coding" udemy course by Maximilian Schwarzmüller.
## The application includes
### Structure
- Registration Page
- Login Page
- Products Page
- Single Product Page
- Cart Page
- User Orders Page
- Admin Products Page
- Admin Orders Page
- Stripe API Payment Page
### Features
- Registration checks for valid email and valid password through a password validator npm package
- Protection against CSRF and XSS attacks and NoSQL injections
- Sessions, in the form of cookies
- Responsive Design, allowing for the usage of a mobile device
- A number of quality of life changes like: 
  - During login/registration, you can check your password through a little eye icon
  - In case you mess up during registration, your entered data is saved in the input fields
  - Custom error messages during registration/login, as well as custom error pages
  - Removing items from the cart if their quantity is set to 0 by the user
  - Many others... 
### Technologies
- HTML
- CSS
- JS
- NodeJS
- Express
- NoSQL
### npm Packages
- ejs - allows us to use JS logic in HTML
- mongodb
- bcryptjs - used for hashing passwords
- csurf - used to add csrf tokens that are used for protection against CSRF attacks ***NOTE: This package has recently been depricated***
- express-session - session middleware for Express
- connect-mongodb-session - MongoDB-backend session storage for connect/Express by MongoDB
- password-validator - used for configuring a password template, instead of using a complex regex
- multer - middleware, used for handling the uploading of files
- uuid/uuid.v4 - used for creating unique ID's. In the project it's used for creating ID's for the product images
- stripe - wrapper that provides access to the Stripe API payment system
### Extra Notes