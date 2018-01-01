import m from 'mithril'
import Exercise from 'models/exercise'
import { stateless } from 'helpers/view'
import Modal from 'views/modal'
import exerciseForm from 'components/exercise-form'

const MODAL_ID = 'new-exercise-modal'
const FORM_ID = 'new-exercise-form'

const exerciseItem = exercise => <li>{exercise.name}</li>

export default stateless(({exercises, modalHelpers, formHelpers}) => {
  const form = formHelpers.at(FORM_ID)

  return (
    <div className="exercise-list">
      <h2>Exercises</h2>
      <span className="btn" onclick={() => modalHelpers.open(MODAL_ID)}>+</span>
      <Modal
        header="Create Exercise"
        isOpen={modalHelpers.isOpen(MODAL_ID)}
        onCancel={modalHelpers.close}
        onSubmit={() => {
          form.submit(Exercise.post)
            .then(modalHelpers.close)
        }}
      >
        {exerciseForm(form)}
      </Modal>
      <ul>
        {exercises.map(exerciseItem)}
      </ul>
    </div>
  )
})