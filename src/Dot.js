const React = require('react')
const div = require('./utils/div.js')
const onMouseEnter = require('./utils/onMouseEnter.js')
const onMouseLeave = require('./utils/onMouseLeave.js')
const dotStyle = require('./styles/dot.js')
const dotDynStyle = require('./styles/dot-dyn.js')

function Dot (props) {
  const [hover, setHover] = React.useState(false)
  const style = { ...dotStyle, ...dotDynStyle(props.s * 1.7, props.x, props.y), background: hover ? '#ff0' : dotStyle.background }
  return div({ style, onMouseEnter: onMouseEnter(setHover), onMouseLeave: onMouseLeave(setHover) }, hover ? `*${props.text}*` : props.text)
}

module.exports = React.memo(Dot)
