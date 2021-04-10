const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exercise = require("./exercise");

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now(),
    },
    exercises: [Exercise],
});

// export it
module.exports = mongoose.model("Workout", workoutSchema);