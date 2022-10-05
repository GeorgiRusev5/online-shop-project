const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignUp(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
if(!sessionData){
  sessionData = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    street: '',
    postal: '',
    city: ''
  }
}
  res.render("customer/auth/signup", {inputData:sessionData});
}

async function signUp(req, res, next) {
  
  const enteredData = {
   email: req.body.email,
     password: req.body.password,
     confirmPassword: req.body.confirmPassword,
     fullname: req.body.fullname,
     street: req.body.street,
     postal: req.body.postal,
     city: req.body.city
  }
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    )) {
      
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage:
            "Please check your input, all fields must be filled. The postal code should be 4 numbers",
            ...enteredData
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

     if( !validation.checkPasswordCorrectness(req.body.password) 
    
     ){
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage:
            "Please check your password input, the password must be between 8 and 12 symbols long and include atleast 1 special symbol and 1 number",
            ...enteredData
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
     }
     if(!validation.passwordsAreConfirmed(
      req.body.password,
      req.body.confirmPassword
    )){
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage:
            "The passwords you have entered do not match. Please match them.",
            ...enteredData
        },
        function () {
          res.redirect("/signup");
        }
        );
      return;
    }
  

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(req,{
        errorMessage: "User exists already, try logging in instead",
        ...enteredData
      }, function(){
        res.redirect("/signup");
      })
      return;
    }

    await user.signUp();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogIn(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if(!sessionData){
    sessionData = {
      email: '',
      password: ''
    }
  }
  res.render("customer/auth/login", {inputData: sessionData});
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }
  const sessionErrorDataMessage = {
    errorMessage: 'Invalid credentials - please check the entered email and password!',
    email: user.email,
    password: user.password
  }
  if (!existingUser) {
    sessionFlash.flashDataToSession(req,sessionErrorDataMessage, function(){
      res.redirect("/login");
    })  
    return;
  }

  const passwordIsCorrect = await user.comparePassword(existingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req,sessionErrorDataMessage, function(){
      res.redirect("/login");
    })
    return;
  }
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignUp: getSignUp,
  getLogIn: getLogIn,
  signUp: signUp,
  login: login,
  logout: logout,
};
