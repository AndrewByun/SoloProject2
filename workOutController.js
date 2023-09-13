const User = require('./models/workOutModel.js')
// const Workout = require('./models/workOutModel');

const workOutController = {};

workOutController.addWorkOut = (req, res, next)=>{
    const workOutInfo = req.body
    User.create(workOutInfo)
    .then((info)=>{
        next();
    })
    .catch((err)=>{
        console.error(err);
        return next({
            status: 400,
            log: "addWorkOut",
            message: "could not add work out",
          });
    })
}

workOutController.getWorkOut = (req, res, next)=>{
    User.find({})
    .then(workouts => {
        res.locals.workouts = workouts;
        console.log(`This is res.locals.workouts `+ res.locals.workouts)
        return next();
    })
    .catch((err)=>{
        return next({
            status: 500,
            log: "getWorkOut",
            message: "could not retrieve workouts",
        })
    })
}

module.exports = workOutController;
