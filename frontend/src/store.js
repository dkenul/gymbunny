import m from 'mithril'

const forms = {}

const getForm = id => {
  if (!forms[id]) {
    forms[id] = {}
  }

  return forms[id]
}

export default {
  users: {},
  exercises: {},

  forms,
  getForm,
  resetForm: id => {
    forms[id] = {}
    m.redraw()
  }
}
