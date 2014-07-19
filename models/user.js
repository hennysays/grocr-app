var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        dateCreated  : Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    isAdmin          : Boolean,
    sessions         : [Date],
    userInfo          : {
        street       : String,
        city         : String, 
        province     : String,
        country      : String,
        postalCode   : String,
        phoneNumber  : String,
    },
    basket           : [{
        name: String,
        description: String,
        savings: String,
        price: String,
        units: String,
        unitPrice: Number,
        date: Number,
        category: Number,
        store: {type: Number, ref: 'GroceryStore'},
        quantity: Number,
    }]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
