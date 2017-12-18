import m from 'mithril'
import Store from 'store'
import { basicRest } from 'helpers/api'
const { updateWorkout } = Store

const BASE_URL = '/v1/workouts'

const Workout = {
  ...basicRest(BASE_URL, updateWorkout),
}

export default Workout
