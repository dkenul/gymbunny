import m from 'mithril'

// A statless view passed the whole vnode (seems unnecessary in most cases)
export const statelessVnode = view => ({view})

// A stateless view passed only "vnode.attrs" and "vnode.children" which should cover most cases
export const stateless = view => ({
  view: vnode => view(vnode.attrs, vnode.children)
})
