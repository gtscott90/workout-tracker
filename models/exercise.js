const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
exercises: 
    {
        type: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        totalDuration: {
            type: Number,
            default: 0,
            trim: true,
        },
        weight: {
            type: Number,
            default: 0,
            trim: true,
        },
        reps: {
            type: Number,
            default: 0,
            trim: true,
        },
        sets: {
            type: Number,
            default: 0,
            trim: true,
        },
        distance: {
            type: Number,
            default: 0,
            trim: true,
        }
    }
});

module.exports = exerciseSchema;