import m from 'mithril'
import { stateless } from 'helpers/view'

export default stateless(() =>
  <nav className="clearfix">
    <h1 className="left"><a href="/users" oncreate={m.route.link}>Gym Bunny</a></h1>
    <ul className="right">
      <li><a href="/users" oncreate={m.route.link}>Users</a></li>
    </ul>
  </nav>
)
