import m from 'mithril'
import Store from 'store'
import { basicRest } from 'helpers/api'
const { updateExercise } = Store

const BASE_URL = '/v1/exercises'

const Exercise = {
  ...basicRest(BASE_URL, updateExercise)
}

export default Exercise