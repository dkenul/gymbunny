import m from 'mithril'
import { stateless } from 'helpers/view'
import { toDateString } from 'helpers/localization'
import WorkoutExercises from './workout-exercises'

export default stateless(({
  user,
  workout
}) => {
  if (!(workout && user)) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="workout-detail">
      <h2>{user.username} - {workout.description} - {toDateString(workout.onDate)}</h2>
      <WorkoutExercises workoutExercises={workout.workoutExercises} />
    </div>
  )
})