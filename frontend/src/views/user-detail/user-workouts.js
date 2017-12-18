import m from 'mithril'
import Workout from 'models/workout'
import { stateless } from 'helpers/view'
import Modal from 'views/modal'
import UserWorkout from './user-workout'

const MODAL_ID = 'new-workout-modal'
const FORM_ID = 'new-workout-form'

const newWorkoutForm = (user, {get, set}) => {
  return (
    <div>
      {
        [
          ['Date', 'onDate', 'date'],
          ['Description', 'description', 'text'],
        ].map(([label, field, type]) =>
          <div className="form-field">
            <label>
              {label}
              <input
                type={type}
                oninput={e => set(field, e.target.value)}
                value={get(field) || ''}
              />
            </label>
          </div>
        )
      }
      <h2>Exercises</h2>
      <span className="btn" onclick={() => {
        const idx = get('workoutExercises.length', 0)

        set(`workoutExercises[${idx}]`, {
          workoutId: 0 // will be set by backend
        })
      }}>+</span>
      <ul>
        {get('workoutExercises', []).map((wke, i) =>
          <div className="form-field">
            <select value={wke.exerciseId} oninput={e => set(`workoutExercises[${i}].exerciseId`, +e.target.value)}>
              <option></option>
              {[1, 2].map(exerciseId =>
                <option value={exerciseId}>{exerciseId}</option>
              )}
            </select>
          </div>
        )}
      </ul>
    </div>
  )
}

export default stateless(({user, workouts, modalHelpers, formHelpers}) => {
  const form = formHelpers.at(FORM_ID)

  return (
    <div>
      <h2>Workouts</h2>
      <span className="btn" onclick={() => modalHelpers.open(MODAL_ID)}>New Workout</span>
      <ul>
        {workouts.map(workout =>
          <UserWorkout key={workout.id} workout={workout} />
        )}
      </ul>
      <Modal
        header="Create Workout"
        isOpen={modalHelpers.isOpen(MODAL_ID)}
        onCancel={modalHelpers.close}
        onSubmit={() => {
          form.submit(Workout.post, {userId: user.id})
            .then(modalHelpers.close)
        }}
      >
        {newWorkoutForm(user, form)}
      </Modal>
    </div>
  )
})