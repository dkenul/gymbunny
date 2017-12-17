import m from 'mithril'
import Store from 'store'
const { updateUser, updateWorkout } = Store

const BASE_URL = '/v1/users'

const User = {
  post: data =>
    m.request({
      method: 'POST',
      url: BASE_URL,
      data,
    })
    .then(updateUser),

  fetch: id =>
    m.request({
      method: 'GET',
      url: `${BASE_URL}/${id}`,
    })
    .then(updateUser),

  fetchWorkouts: id =>
    m.request({
      method: 'GET',
      url: `${BASE_URL}/${id}/workouts`
    })
    .then(r => r.forEach(updateWorkout)),

  fetchAll: () =>
    m.request({
      method: 'GET',
      url: BASE_URL,
    })
    .then(r => r.forEach(updateUser))
}

export default User
