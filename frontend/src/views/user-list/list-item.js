import m from 'mithril'
import { stateless } from 'helpers/view'

export default stateless(({user}) =>
  <li className="user-list-item">
    <a href={`/users/${user.id}`} oncreate={m.route.link}>
      {user.username}
    </a>
  </li>
)