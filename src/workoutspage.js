const workouts = document.querySelector('#workouts');
fetch('/workouts')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const allworkouts = data.workouts;
    allworkouts.forEach((workout) => {
      const workoutListItem = document.createElement('li');
      workoutListItem.appendChild(
        document.createTextNode(`${workout.name}: ${workout.duration}`)
      );
      workouts.appendChild(workoutListItem);
    });
  });
