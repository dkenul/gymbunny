import m from 'mithril'

import Store from 'store'
import User from 'models/user'
import Exercise from 'models/exercise'
import Workout from 'models/workout'
import { values } from 'helpers/functional'
import Root from './root'

const getUserId = vnode => vnode.attrs.routeParams.id

export default {
  oninit: vnode => {
    const userId = getUserId(vnode)
    User.fetch(userId)
    User.fetchWorkouts(userId)
    Exercise.fetchAll()
  },
  view: vnode => {
    const user = Store.users[getUserId(vnode)]
    const workouts = user
      ? values(Store.workouts)
        .filter(workout => workout.userId === user.id)
        .sort((a, b) => a.onDate - b.onDate)
      : []

    return <Root
      user={user}
      workouts={workouts}
      exercises={values(Store.exercises)}
      modalHelpers={Store.modalHelpers}
      formHelpers={Store.formHelpers}
      deleteWorkout={Workout.destroy}
    />
  },
}
