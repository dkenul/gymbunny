import m from 'mithril'

import { stateless } from 'helpers/view'
import Header from 'views/header'
import UserList from 'views/user-list'
import UserDetail from 'views/user-detail'

import 'less/app.less'

const RouteWrapper = View => stateless(attrs =>
  <div>
    <Header />
    <section>
      <View routeParams={attrs} />
    </section>
  </div>
)

const routeMap = [
  ['/',                    UserList],
  ['/users/:id',         UserDetail],
]

m.route(document.body, "/", routeMap.reduce((routes, [route, view]) => {
  routes[route] = RouteWrapper(view)
  return routes
}, {}))
