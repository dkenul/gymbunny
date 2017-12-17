import m from 'mithril'
import { stateless } from 'helpers/view'

export default stateless(({user}) =>
  <div>
    <h2>{user.username}</h2>
    <div>{user.firstName}</div>
    <div>{user.lastName}</div>
    <div>{user.email}</div>
  </div>
)