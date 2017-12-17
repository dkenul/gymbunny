import m from 'mithril'

const forms = {}
const modals = {}

const Store =  {
  users: {},
  exercises: {},
  workouts: {},

  modals,
  forms,
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
  checkModal: id => {
    if (!modals[id]) {
      modals[id] = false
    }

    return modals[id]
  },
  setModal: (id, state) => {
    modals[id] = state
    m.redraw()
  }
}

const updateSubset = (field, root = Store) => data => {
  root[field][data.id] = Object.assign(
    {},
    root[field][data.id],
    data,
  )
}

Store.updateUser = updateSubset('users')
Store.updateWorkout = updateSubset('workouts')

export default Store
