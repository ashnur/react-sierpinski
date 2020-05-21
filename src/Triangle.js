const React = require('react')
const Dot = require('../src/Dot.js')
const frg = require('../src/utils/frg.js')
const c = require('../src/utils/createElement.js')
function SierpinskiTriangle (props) {
  const x = props.x - (props.ts / 2)
  const y = props.y - (props.ts / 2)
  const text = props.children.seconds
  const s = props.s / 2
  const hs = s / 2
  const sdr = props.sdr != null ? props.sdr : 0.3
  const e = performance.now() + sdr

  while (performance.now() < e) {
    // Artificially long execution time.
  }

  return props.s <= props.ts ? c(Dot)({ x, y, s, text }) : frg(null,
    React.createElement(SierpinskiTriangle, { key: 'top', x, y: y - hs, s, sdr, ts: props.ts }, props.children),
    React.createElement(SierpinskiTriangle, { key: 'left', x: x - s, y: y + hs, s, sdr, ts: props.ts }, props.children),
    React.createElement(SierpinskiTriangle, { key: 'right', x: x + s, y: y + hs, s, sdr, ts: props.ts }, props.children)
  )
}

module.exports = SierpinskiTriangle
