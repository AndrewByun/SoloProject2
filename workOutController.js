const User = require('./models/workOutModel.js');
// const Workout = require('./models/workOutModel');

const workOutController = {};

workOutController.addWorkOut = (req, res, next) => {
  const workOutInfo = req.body;
  console.log('the request body is ');
  console.log(req.body);

  User.create(workOutInfo)
    .then((info) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      return next({
        status: 400,
        log: 'addWorkOut',
        message: 'could not add work out',
      });
    });
};

workOutController.getWorkOut = (req, res, next) => {
  User.find({})
    .then((workouts) => {
      res.locals.workouts = workouts;
      // console.log(`This is res.locals.workouts`)
      // console.log(res.locals.workouts);
      return next();
    })
    .catch((err) => {
      return next({
        status: 500,
        log: 'getWorkOut',
        message: 'could not retrieve workouts',
      });
    });
};

workOutController.deleteWorkOut = (req, res, next) => {
  User.deleteMany({})
    .then(() => {
      console.log('deleted workout');
      next();
    })
    .catch((error) => {
      console.error(error);
      return next({
        error: 'error deleting workout',
        method: 'delete workout',
        status: 404,
      });
    });
};

module.exports = workOutController;
