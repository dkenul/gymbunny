import m from 'mithril'
import { stateless } from 'helpers/view'
import { toDateString } from 'helpers/localization'
import icon from 'components/icon'

export default stateless(({workout, deleteWorkout}) =>
  <div className="workout-item">
    <a className="on-date" href={`/workouts/${workout.id}`} oncreate={m.route.link}>{toDateString(workout.onDate)}</a>
    {icon('close', {onclick: () => deleteWorkout(workout.id)})}
    <div>{workout.description}</div>
  </div>
)