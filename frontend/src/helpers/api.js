import m from 'mithril'

export const basicRest = (url, handler) => ({
  fetch: id =>
    m.request({
      method: 'GET',
      url: `${url}/${id}`,
    })
    .then(handler),

  fetchAll: () =>
    m.request({
      method: 'GET',
      url,
    })
    .then(r => r.forEach(handler)),
  
  post: data =>
    m.request({
      method: 'POST',
      url,
      data,
    })
    .then(handler),
})