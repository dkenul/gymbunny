import m from 'mithril'
import { stateless } from 'helpers/view'
import { toDateString } from 'helpers/localization'

export default stateless(({workout}) =>
  <div>
    <span>{workout.id} -- </span>
    <a href={`/workouts/${workout.id}`} oncreate={m.route.link}>{toDateString(workout.onDate)}</a>
    <div>{workout.description}</div>
  </div>
)