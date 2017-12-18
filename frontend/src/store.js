import m from 'mithril'
import get from 'lodash.get'
import set from 'lodash.set'

const forms = {}

// TODO - move underlying data to private object
// TODO - better organization of helpers
const Store =  {
  // data
  users: {},
  exercises: {},
  workouts: {},

  // metadata
  forms,
  modal: null, // can only be one open modal
  expandedUserWorkouts: new Set,
  resetForm: id => {
    forms[id] = {}
    m.redraw()
  },
  getForm: id => {
    if (!forms[id]) {
      forms[id] = {}
    }

    return forms[id]
  },
}

const extendProp = (field, root = Store) => data => {
  root[field][data.id] = Object.assign(
    {},
    root[field][data.id],
    data,
  )
}

const checkSet = (field, root = Store) => id => {
  return root[field].has(id)
}

const updateSet = (field, root = Store) => (id, state) => {
  root[field][state ? 'add' : 'delete'](id)
  m.redraw()
}

Store.updateUser = extendProp('users')
Store.updateWorkout = extendProp('workouts')
Store.updateExercise = extendProp('exercises')

Store.checkModal = checkSet('modals')
Store.setModal = updateSet('modals')

Store.modalHelpers = {
  open: id => {
    Store.modal = id
    m.redraw()
  },
  close: () => {
    Store.modal = null
    m.redraw()
  },
  isOpen: id => Store.modal === id,
}

const getFormData = id => () => Object.assign({}, forms[id])
const getFormField = id => (path, defaultValue) => get(forms[id], path, defaultValue)
const resetForm = (id, shape) => () => {
  forms[id] = shape
  m.redraw()
}

Store.formHelpers = {
  // get an API to manipulate a form at a given ID
  at: (id, shape = {}) => {
    if (!forms[id]) {
      forms[id] = shape
    }

    return {
      id,
      get: getFormField(id),
      set: (path, value) => {
        set(forms[id], path, value)
        m.redraw()
      },
      data: getFormData(id),
      reset: resetForm(id, shape),
      submit: (fn, otherData = {}) =>
        fn(Object.assign(getFormData(id)(), otherData))
          .then(resetForm(id, shape))
          .then(m.redraw),
    }
  },
}

Store.clearTransients = () => {
  // sets
  ;[
    'expandedUserWorkouts',
  ].forEach(t => Store[t].clear())

  // modal
  Store.modalHelpers.close()
}

export default Store
