import m from 'mithril'
import User from 'models/user'
import Store from 'store'

const getUserId = vnode => vnode.attrs.routeParams.id

export default {
  oninit: vnode => User.fetch(getUserId(vnode)),
  view: vnode => {
    const user = Store.users[getUserId(vnode)]

    if (!user) {
      return <div>Loading</div>
    }

    return (
      <div className="user-detail">
        <h2>{user.username}</h2>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
      </div>
    )
  },
}
