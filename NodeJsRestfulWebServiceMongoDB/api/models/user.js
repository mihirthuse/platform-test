const mongoose = require('mongoose');

//Mongoose helps in creating objects of the model schema. This object is exported so that it can be used anywhere in the project for db operations
const userSchema = mongoose.Schema({
    //_id is the auto incremental id which is generated when a user is registered.
    _id: mongoose.Schema.Types.ObjectId,
    //name of the new user.
    name: { type: String},
    //email of the new user. It is a required field while signing up.
    email: {
        type: String, 
        required: true, 
        //This regex ensures that the input user email is valid and according to international standards.
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    //password of the new user. It is a required field while signing up.
    password: { type: String, required: true },
    //active_session by default is 0. It maintains the user web token and indicates if the user is logged in or not.
    active_session: { type: String, default: "0" }
});

module.exports = mongoose.model('User', userSchema);