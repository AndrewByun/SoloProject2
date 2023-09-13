const mongoose = require('mongoose');

const workOutSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a workout'],
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Workout = mongoose.model('Workout', workOutSchema);

module.exports = Workout;
