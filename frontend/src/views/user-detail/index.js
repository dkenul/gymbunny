import m from 'mithril'

import Store from 'store'
import User from 'models/user'
import Root from './root'

const getUserId = vnode => vnode.attrs.routeParams.id

export default {
  oninit: vnode => {
    const userId = getUserId(vnode)
    User.fetch(userId)
    User.fetchWorkouts(userId)
  },
  view: vnode => {
    const user = Store.users[getUserId(vnode)]
    const workouts = Object.values(Store.workouts).filter(workout => workout.userId === user.id)

    return <Root
      user={user}
      workouts={workouts}
    />
  },
}
