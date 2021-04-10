const express = require("express");
const mongoose = require("mongoose");
const { db } = require("../models/workout");
const router = express.Router();
const Workout = mongoose.model("workout");
const app = express();

router.get("/api/workouts", (req, res) => {
    Workout.aggregate({
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        }
    }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

// Creating a workout
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then((dbWorkout) => {
            res.json(dbWorkout)
        }).catch(err => {
            res.status(400).json(err)
        })
})

// Updating a workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }
    ).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err)
    });
});

module.exports = router;