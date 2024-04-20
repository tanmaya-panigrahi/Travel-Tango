const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const destinationSchema1 = new Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
        unique: true
    },
    aboutPlace: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    day1: {
        type: String,
        required: true
    },
    day2: {
        type: String,
        required: true
    },
    day3: {
        type: String,
        required: true
    },
    day4: {
        type: String,
        required: true
    },
    day5: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    inclusion: {
        type: String,
        required: true
    },
    exclusion: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],


});

module.exports = mongoose.model('dest1', destinationSchema1);