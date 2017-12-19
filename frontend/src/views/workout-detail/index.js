import m from 'mithril'

import Store from 'store'
import User from 'models/user'
import Workout from 'models/workout'
import { values } from 'helpers/functional'
import Root from './root'

const getWorkoutId = vnode => vnode.attrs.routeParams.id

export default {
  oninit: vnode => {
    Workout
      .fetch(getWorkoutId(vnode))
      .then(workout => User.fetch(workout.userId))
  },
  view: vnode => {
    const workout = Store.workouts[getWorkoutId(vnode)]
    const user = Store.users[workout && workout.userId]

    return <Root
      user={user}
      workout={workout}
    />
  },
}
