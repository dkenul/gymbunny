import m from 'mithril'
import Store from 'store'

const updateUser = user => {
  Store.users[user.id] = Object.assign(
    {},
    Store.users[user.id],
    user,
  )
}

const User = {
  fetch: id =>
    m.request({
      method: 'GET',
      url: `/v1/users/${id}`,
    })
    .then(updateUser),

  fetchAll: () =>
    m.request({
      method: 'GET',
      url: '/v1/users',
    })
    .then(r => r.users.forEach(updateUser))
}

export default User
