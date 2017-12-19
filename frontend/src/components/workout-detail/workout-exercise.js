import m from 'mithril'
import get from 'lodash.get'

const setHeader = () =>
<tr>
  <th>#</th>
  <th>Weight</th>
  <th>Reps</th>
</tr>

const setRow = (set, i) =>
<tr>
  <td>{i + 1}</td>
  <td>{set.weight}</td>
  <td>{set.reps}</td>
</tr>

const workoutExercise = workoutExercise =>
<li className="workout-exercise">
  <h3>{get(workoutExercise, 'exercise.name', '...')}</h3>
  {workoutExercise.sets &&
    <div>
      <table>
        {setHeader()}
        {workoutExercise.sets.map(setRow)}
      </table>
    </div>
  }
</li>

export default workoutExercise