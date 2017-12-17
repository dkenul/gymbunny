import m from 'mithril'
import { stateless } from 'helpers/view'
import UserWorkout from './user-workout'

export default stateless(({user, workouts}) =>
  <div>
    <h2>Workouts</h2>
    <ul>
      {workouts.map(workout =>
        <UserWorkout workout={workout} />
      )}
    </ul>
  </div>
)