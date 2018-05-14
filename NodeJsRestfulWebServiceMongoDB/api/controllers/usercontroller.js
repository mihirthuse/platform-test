//mongoose acts as a modeling object over MongoDB. It has features that help in accessing data with minimal code.
const mongoose = require("mongoose");

//bcrypt is used to create hash value of incoming password
const bcrypt = require('bcrypt');

//jwt is JSON Web Tokens. It is a type of token authentication system that provides a unique token on a successful login.
const jwt = require('jsonwebtoken');
const User = require("../models/user");

//displays list of all users who are registered, along with their id, name and email
exports.list_all_users = (req, res, next) => {
    User.find()
        .select("_id name email")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc =>{
                    return {
                        id: doc._id,
                        name: doc.name,
                        email: doc.email
                    };
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//enables user registration by taking inputs - name, email and password
exports.user_signup =  (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "User exists! Please try another email."
          });
        } else {
            //bcrypt.hash creates a hash value of the (password) by taking the level of (salt_value) and provides (callback)
            //active_session i.e. token value for each newly registered user is by default 0.
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: "Error while hashing password!"
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                active_session: "0"
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "Congratulations! Your have been registered successfully."
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };

  //provides a user to login by taking inputs - email and password
  exports.user_login =  (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed or Wrong Email ID'
                });
            } else {
                //bcrypt compare function takes in - input password, password of user from database and compares to see if they are equal.
                //If equal then allow user to login
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err) {
                        return result.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if(result) {
                        if(user[0].active_session === "0") {
                            //jwt.sign method creates a web token which is provided back to the user after successful log in.
                            const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                                //this key is set as an environment variable in nodemon.json. It is used as one of the paramets while creating JSON web token.
                            }, process.env.JWT_KEY, 
                            {
                                expiresIn: "1h",
                            }
                            );
                            
                            User.update({ _id: user[0]._id}, { active_session: token })
                            .exec()
                            .then(result=> {
                                console.log("Active Session Updated")
                            })
                            .catch(err=> { });

                            return res.status(200).json({
                                message: 'You are logged in successfully!',
                                token: token
                            });

                        } else {
                            return res.status(500).json({
                                message: "You already logged in!",
                                token: user[0].active_session
                            });
                        }
                    }

                    return res.status(401).json({
                        message: 'Wrong password'
                    });
                })
            }
        })
        .catch(err => {
            console.log("Login Error : "+err);
            res.status(500).json({
                error: err
            });
        });
};

//this function is used to update the user information such as name, password. Either of them can be updated one at a time.
//It takes in the user token value and the parameter to update.
exports.user_update =  (req, res, next) => {
    const currentToken = req.body.token;
    const newPassword = req.body.password;
    const newName = req.body.name;
    
    User.find({ active_session: currentToken })
    .exec()
    .then(user => {
        if(user.length >= 1) {
            if(newName != undefined && newName != " ") {
                User.update({ _id: user[0]._id}, { name: newName})
                .exec()
                .then( result=>{
                    res.status(200).json({
                        message: "Name update successfully."
                    });
                })
                .catch(res => {
                    res.status(500).json({
                        message: "Error while updating name. Please try with valid token."
                    });
                })
            } else if(newPassword != undefined && newPassword != " ") {
                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if(err) {
                        res.status(500).json({
                            message: "Error while updating password. Please try with valid token."
                        });  
                    } else {
                        User.update({_id: user[0]._id}, { password: hash, active_session: "0"})
                        .exec()
                        .then(result2 => {
                            res.status(200).json({
                                message: "Password updated successfully. Please log in with new password."
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Error while updating password. Please try with valid token."
                            });
                        });
                    }
                });
            }
        }
    })
    .catch( err => {
        return res.status(500).json({
            message: "No active user found logged in"
        });
    });  
};

//this function validates the token value to check if the user is logged in and deletes the user associated with the token.
exports.user_delete = (req, res, next) => {

    User.find({ active_session: req.body.token })
    .exec()
    .then(user => {
        if(user.length >= 1) {
            User.findByIdAndRemove({ _id: user[0]._id })
            .exec()
            .then( result => {
                    return res.status(200).json({
                        message: "Your record has been deleted. Please sign up to create a new record."
                    });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                error: err
                });
            });
        } else {
            return res.status(500).json({
                message: "User does not exist"
            });
        }
    })
    .catch( err => {
        return res.status(500).json({
            message: "User does not exist or is not logged in"
        });
    });
};

//this function invalidates the user token value, provided the user is already logged in.
exports.user_logout =  function(req, res, next) {
    User.find({ active_session: req.body.token })
    .exec()
    .then(user => {
        if(user.length >= 1) {
            User.update({ _id: user[0]._id}, { active_session: "0" })
            .exec()
            .then( result=> {
                return res.status(200).json({
                    message: "You are logged out successfully!"
                });
            });
        }
    })
    .catch( err => {
        return res.status(500).json({
            message: "You are already logged out!"
        });
    });
};