function authication(res, req, next){ 
    console.log("Authenticating");
    next();
  }

  module.exports = authication;