import m from 'mithril'
import map from 'lodash.map'

import Store from 'store'
import User from 'models/user'

import UserListItem from './list-item'
import Modal from 'views/modal'

const FORM_ID = 'new-user-form'

const updateField = (dataObj, fieldName) => e => {
  dataObj[fieldName] = e.target.value
}

const CREATE_USER_MODAL_ID = 'new-user-modal'

const isOpen = () => Store.checkModal(CREATE_USER_MODAL_ID)
const closeModal = () => Store.setModal(CREATE_USER_MODAL_ID, false)
const openModal = () => Store.setModal(CREATE_USER_MODAL_ID, true)
const onSubmit = () => {
  closeModal()
  User.post(Store.getForm(FORM_ID))
      .then(() => Store.resetForm(FORM_ID))
      .then(m.redraw)
}

const newUserForm = () => {
  const data = Store.getForm(FORM_ID)

  return (
    <div>
      New User
      {
        [
          ['username', 'username'],
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Email', 'email']
        ].map(([label, field]) =>
          <div>
            <label>
              {label}
              <input oninput={updateField(data, field)} value={data[field] || ''} />
            </label>
          </div>
        )
      }
    </div>
  )
}

window._Store = Store

export default {
  oninit: User.fetchAll,
  view: () => (
    <div className="user-list">
      <h2>Users</h2>
      <span className="btn" onclick={openModal}>New User</span>
      <Modal
        isOpen={isOpen()}
        onSubmit={onSubmit}
        onCancel={closeModal}
        header="Create User"
      >
        {newUserForm()}
      </Modal>
      <ul>
      {map(Store.users, user =>
        <UserListItem user={user} />
      )}
      </ul>
    </div>
  ),
}
