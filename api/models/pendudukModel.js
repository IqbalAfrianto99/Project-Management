'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PendudukSchema = new Schema({
    NIP: {
        type: String
    },
    name: {
    type: String,
    required: 'Kindly enter the name of the task'
    },
    Created_date: {
    type: Date,
    default: Date.now
    },
    status: {
    type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
    }
});

module.exports = mongoose.model('tbl_penduduks', PendudukSchema);