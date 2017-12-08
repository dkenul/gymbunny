import m from 'mithril'
import Store from 'store'

const updateUser = user => {
  Store.users[user.id] = Object.assign(
    {},
    Store.users[user.id],
    user,
  )
}

const BASE_URL = '/v1/users'

const User = {
  post: data =>
    m.request({
      method: 'POST',
      url: BASE_URL,
      data,
    })
    .then(updateUser),

  fetch: id =>
    m.request({
      method: 'GET',
      url: `${BASE_URL}/${id}`,
    })
    .then(updateUser),

  fetchAll: () =>
    m.request({
      method: 'GET',
      url: BASE_URL,
    })
    .then(r => r.users.forEach(updateUser))
}

export default User
