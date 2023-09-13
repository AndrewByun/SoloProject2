const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workOutController = require('./workOutController')
app.use(express.json());
const Workout = require('./models/workOutModel');

app.get('/', (req, res) => {
    return res.send('Hello Node API');
  });
  
  app.get('/blog', (req, res) => {
    return res.send('Hello welcome to the blog');
  });
  
  app.get('/workouts', workOutController.getWorkOut, (req, res) => {
    // console.log(res.locals.allworkouts)
    const allWorkouts = res.locals.workouts;
    return res.send(allWorkouts);
  });
  
  app.post('/workout', workOutController.addWorkOut,(req, res) => {
    console.log(req.body);
    return res.status(200).send(req.body);
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
    
    
    // app.use((err, req, res, next) => {
    //   const defaultErr = {
    //     log: 'Express error handler caught unknown middleware error',
    //     status: 500,
    //     message: 'An error occurred',
    //   };
    //   const errorObj = Object.assign({}, defaultErr, err);
    //   console.log(errorObj.message);
    //   return res.status(errorObj.status).json({error: errorObj.message});
    // });
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
    module.exports = app;

