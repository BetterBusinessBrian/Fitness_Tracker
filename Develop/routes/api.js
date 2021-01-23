
const router = require("express").Router();
const workout = require("../models/workoutModel.js");
require ('mongoose');


router.post('/api/workout', ({ body }, res) => {
    workout.create(body)
    .then(dbTransaction => {
        res.json(dbTransaction);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.get("/api/workout", (req, res) => {
  workout.find({})
  .then(dbTransaction => {
    console.log(dbTransaction);
    res.json(dbTransaction);
})
.catch(err=> {
    res.status(400).json(err);
});
});

router.put('/api/workout/:id', ({ body, params }, res) => {
    workout.findByIdAndUpdate(params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true }
        )
    .then(dbTransaction => {
        res.json(dbTransaction);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.get('/api/workout/range', (req, res) => {
    workout.find({}).limit(7).sort({$natural:-1})
    .then(dbTransaction => {
        console.log(dbTransaction);
        res.json(dbTransaction);
    })
    .catch(err=> {
        res.status(400).json(err);
    });
})

module.exports = router;
