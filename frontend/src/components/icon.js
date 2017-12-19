import m from 'mithril'

const icon = (id, {
  width = '20px',
  height = 'auto',
  onclick = null,
}) => 
<span style={`display:inline-block;vertical-align:middle;width:${width};height:${height};${onclick ? 'cursor:pointer;' : ''}`} onclick={onclick}>
{({
  close: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#D75A4A"/><polyline points="16 34 25 25 34 16 " style="fill:none;stroke-width:2;stroke:#FFF"/><polyline points="16 16 25 25 34 34 " style="fill:none;stroke-width:2;stroke:#FFF"/></svg>
})[id]}
</span>

export default icon