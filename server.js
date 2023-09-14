const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workOutController = require('./workOutController');
const path = require('path');
// const Workout = require('./models/workOutModel');
// const workoutRouter = require('express').Router();
// app.use('/workout', workoutRouter);
// app.use('/', express.static(path.resolve(__dirname, './src')));
// app.use(express.static('src', { 'Content-Type': 'application/javascript' }));

app.use(express.json());

app.use(express.urlencoded());

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '/src/index.html'));
});
app.get('/src/workoutspage.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, '/src/workoutspage.js'));
});
app.get('/workouts', workOutController.getWorkOut, (req, res) => {
  // const allWorkouts = res.locals.workouts;
  return res.send({ workouts: res.locals.workouts });
});
app.get('/workout', (req, res) => {
  return res.sendFile(path.join(__dirname, '/src/workoutspage.html'));
});
app.post('/workout', workOutController.addWorkOut, (req, res) => {
  res.redirect(303, '/workout');
});

app.delete('/workout', workOutController.deleteWorkOut, (req, res) => {
  return res.status(204).send();
});

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://andrewbyun1:werdnanuyb@cluster0.gikakd2.mongodb.net/SoloProject?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected to mongodb');
    app.listen(3000, () => {
      console.log('Node API is running on port 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

module.exports = app;
