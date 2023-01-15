const mongoose = require('mongoose');

const stringParams = {type: String, required: true};

const holder = mongoose.Schema({
    Name: stringParams,
    Price: stringParams,
    Image: stringParams,
    Site: stringParams, 
    Category:stringParams,
    Link: stringParams,
    Added: {type: Date, required: true}
});

module.exports = mongoose.model('holder', holder);
