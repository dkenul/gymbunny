import m from 'mithril'
import { stateless } from 'helpers/view'

const links = [
  ['/exercises', 'Exercises'],
  ['/users', 'Users'],
]

const link = ([route, name]) =>
  <li className="left"><a href={route} oncreate={m.route.link}>{name}</a></li>

export default stateless(() =>
  <nav className="clearfix">
    <h1 className="left"><a href="/users" oncreate={m.route.link}>Gym Bunny</a></h1>
    <ul className="right">
      {links.map(link)}
    </ul>
  </nav>
)
