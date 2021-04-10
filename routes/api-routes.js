const express = require("express");
const mongoose = require("mongoose");
// const { db } = require("../models/workout");
const router = express.Router();
const Workout = mongoose.model("Workout");
// const app = express();

//Defining an async utility to handle errors
// function catchAsync(fn) {
//     return function (req, res, next) {
//       fn(req, res, next).catch((e) => next(e));
//     };
//   }

// workout dashboard
router.get(
  "/api/workouts",
  (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]).then(workouts => res.json(workouts));
});

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


  
  router.get(
    "/api/workouts/range",
    (req, res) => {
      const workouts = Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
        { $sort: { day: -1 } },
        { $limit: 7 },
        { $sort: { day: 1 } },
      ]).exec();
      res.json(workouts);
    }
  );
module.exports = router;