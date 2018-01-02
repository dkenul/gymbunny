import m from 'mithril'
import Store from 'store'
import { stateless } from 'helpers/view'
import Header from 'views/header'
import UserList from 'views/user-list'
import ExerciseList from 'views/exercise-list'
import UserDetail from 'views/user-detail'
import WorkoutDetail from 'views/workout-detail'

import 'less/app.less'

window._Store = Store

const RouteWrapper = (View, route) => ({
  // Before route logic
  onmatch: () => {
    // close modals, etc
    Store.clearTransients()

    // Wrap view with global html
    return stateless(attrs =>
      <div>
        <Header />
        <section>
          <View routeParams={attrs} />
        </section>
      </div>
    )
  }
})

const routeMap = [
  ['/',                    UserList],
  ['/exercises',       ExerciseList],
  ['/users/:id',         UserDetail],
  ['/workouts/:id',   WorkoutDetail],
]

m.route(document.body, "/", routeMap.reduce((routes, [route, view]) => {
  routes[route] = RouteWrapper(view, route)
  return routes
}, {}))
