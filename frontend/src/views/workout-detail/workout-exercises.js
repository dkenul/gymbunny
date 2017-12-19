import m from 'mithril'
import { stateless } from 'helpers/view'
import workoutExercise from 'components/workout-detail/workout-exercise'

export default stateless(({workoutExercises}) =>
  <div>
    <ul>{workoutExercises.map(workoutExercise)}</ul>
  </div>
)