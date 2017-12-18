import m from 'mithril'
import Store from 'store'
import { basicRest } from 'helpers/api'
const { updateUser, updateWorkout } = Store

const BASE_URL = '/v1/users'

const User = {
  ...basicRest(BASE_URL, updateUser),

  fetchWorkouts: id =>
    m.request({
      method: 'GET',
      url: `${BASE_URL}/${id}/workouts`
    })
    .then(r => r.forEach(updateWorkout)),
}

export default User
