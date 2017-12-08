import m from 'mithril'
import map from 'lodash.map'

import Store from 'store'
import User from 'models/user'

const FORM_ID = 'new-user-form'

const updateField = (dataObj, fieldName) => e => {
  dataObj[fieldName] = e.target.value
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
      <span className="btn" onclick={() =>
        User.post(data)
            .then(() => Store.resetForm(FORM_ID))
            .then(m.redraw)
      }>Submit</span>
    </div>
  )
}

export default {
  oninit: User.fetchAll,
  view: () => (
    <div className="user-list">
      <h2>Users</h2>
      {newUserForm()}
      <ul>
      {map(Store.users, user =>
        <li className="user-list-item">
          <a href={`/users/${user.id}`} oncreate={m.route.link}>
            {user.username}
          </a>
        </li>
      )}
      </ul>
    </div>
  ),
}
