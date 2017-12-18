import m from 'mithril'
import Workout from 'models/workout'
import { stateless } from 'helpers/view'
import workoutForm from 'views/functional/workout-form'
import Modal from 'views/modal'
import UserWorkout from './user-workout'

const MODAL_ID = 'new-workout-modal'
const FORM_ID = 'new-workout-form'

export default stateless(({user, workouts, exercises, modalHelpers, formHelpers}) => {
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
        {workoutForm(user, exercises, form)}
      </Modal>
    </div>
  )
})