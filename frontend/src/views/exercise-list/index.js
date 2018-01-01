import m from 'mithril'

import Store from 'store'
import Exercise from 'models/exercise'
import { values } from 'helpers/functional'
import Root from './root'

export default {
  oninit: vnode => {
    Exercise.fetchAll()
  },
  view: vnode => {
    return <Root
      exercises={values(Store.exercises)}
      modalHelpers={Store.modalHelpers}
      formHelpers={Store.formHelpers}
    />
  },
}