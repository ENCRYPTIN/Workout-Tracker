const Workout = require("../Models/workoutModel");
const mongoose = require("mongoose");

//create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    const modelObject = { title, load, reps };

    try {
        const workout = await Workout.create(modelObject);
        res.status(200).json(workout);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: "No Such Workout" });
    }
    const workout = await Workout.findById(id);
    res.status(200).json(workout);

    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json({ workout });
};

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout" });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(404).json({ error: "NO such workout" });
    }
    res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            error: "No such Workout",
        });
    }
    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    );
    if (!workout) {
        return res.status(404).json({ error: "NO such workout" });
    }
    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
};
