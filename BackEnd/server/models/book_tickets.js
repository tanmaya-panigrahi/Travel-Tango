const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const book_tickets = new Schema({
    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    destinations:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    number_of_people:{
        type:Number,
        required:true
    },
    suggestions:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('book_tickets',book_tickets);