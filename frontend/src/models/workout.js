import m from 'mithril'
import Store from 'store'
const { updateWorkout } = Store

const BASE_URL = '/v1/workouts'

const Workout = {
  fetch: id =>
    m.request({
      method: 'GET',
      url: `${BASE_URL}/${id}`,
    })
    .then(updateWorkout),

  fetchAll: () =>
    m.request({
      method: 'GET',
      url: BASE_URL,
    })
    .then(r => r.forEach(updateWorkout)),
  
  post: data =>
    m.request({
      method: 'POST',
      url: BASE_URL,
      data,
    })
    .then(updateWorkout),
}

export default Workout
