import m from 'mithril'
import { stateless } from 'helpers/view'

import UserHeader from './user-header'
import UserWorkouts from './user-workouts'

export default stateless(({
  user,
  workouts,
  exercises,
  modalHelpers,
  formHelpers,
  deleteWorkout,
}) => {
  if (!user) {
    return <div>Loading</div>
  }

  return (
    <div className="user-detail">
      <UserHeader user={user} />
      <UserWorkouts
        user={user}
        workouts={workouts}
        exercises={exercises}
        modalHelpers={modalHelpers}
        formHelpers={formHelpers}
        deleteWorkout={deleteWorkout}
      />
    </div>
  )
})