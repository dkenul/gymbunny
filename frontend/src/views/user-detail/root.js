import m from 'mithril'
import { stateless } from 'helpers/view'

import UserHeader from './user-header'
import UserWorkouts from './user-workouts'

export default stateless(({
  user,
  workouts,
  modalHelpers,
  formHelpers,
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
        modalHelpers={modalHelpers}
        formHelpers={formHelpers}
      />
    </div>
  )
})