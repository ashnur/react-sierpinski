const React = require('react')
const c = require('./utils/createElement.js')
const onMouseEnter = (fn) => () => fn(true)
const onMouseLeave = (fn) => () => fn(false)
const dotStyle = require('./styles/dot.js')
const dotDynStyle = require('./styles/dot-dyn.js')

function Dot (props) {
  const [hover, setHover] = React.useState(false)
  const style = { ...dotStyle, ...dotDynStyle(props.s * 1.7, props.x, props.y), background: hover ? '#ff0' : dotStyle.background }
  return c('div')({ style, onMouseEnter: onMouseEnter(setHover), onMouseLeave: onMouseLeave(setHover) }, hover ? `*${props.text}*` : props.text)
}

module.exports = React.memo(Dot)
