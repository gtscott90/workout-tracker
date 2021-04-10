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
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;