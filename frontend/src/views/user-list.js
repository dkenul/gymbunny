import m from 'mithril'
import map from 'lodash.map'

import Store from 'store'
import User from 'models/user'

export default {
  oninit: User.fetchAll,
  view: () => (
    <div className="user-list">
      <h2>Users</h2>
      <div></div>
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
