import m from 'mithril'
import { stateless } from 'helpers/view'

const exerciseItem = exercise => <li>{exercise.name}</li>

export default stateless(({exercises}) =>
  <div className="exercise-list">
    <h2>Exercises</h2>
    <ul>
      {exercises.map(exerciseItem)}
    </ul>
  </div>
)