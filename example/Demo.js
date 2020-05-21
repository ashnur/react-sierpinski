const React = require('react')
const ReactDOM = require('react-dom')
const c = require('../src/utils/createElement.js')
const SierpinskiTriangle = require('../src/Triangle.js')
const onValueChange = (fn) => (ev) => fn(ev.target.value)
const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee'
}

const initSize = 768
const targetSize = 24

function Demo (props) {
  const [seconds, setSeconds] = React.useState({ seconds: 0 })

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((state) => ({ seconds: (state.seconds % 10) + 1 }))
      //console.log(Object.keys(ReactDOM))
      //ReactDOM.unstable_batchedUpdates(() => { setSeconds((state) => ({ seconds: (state.seconds % 10) + 1 })) })
      // ReactDOM.deferredUpdates(() => { setSeconds((state) => ({ seconds: (state.seconds % 10) + 1 })) })
    }, 1000)
    return () => { clearInterval(intervalId) }
  }, [setSeconds])
  const elapsed = props.elapsed
  const t = (elapsed / 1000) % 10
  const scale = 1 + (t > 5 ? 10 - t : t) / 10
  const [downRate, setDownRate] = React.useState(30)
  const [tsEnabled, setTS] = React.useState(false)

  return c('div')(null,
    c('label')(null, 'time slicing',
    c('input')({ id: "time-slicing-enabled", type: "checkbox" , checked: tsEnabled, onChange: (ev) => {setTS(!!ev.target.checked); update(!!ev.target.checked) } })),
    c('label')(null, 'render lag: ',
    c('input')({ onInput: onValueChange(setDownRate), type: 'range', min: 1, max: 1000, value: downRate })),
    c('div')({ style: { ...containerStyle, transform: `scaleX(${scale / 2.6}) scaleY(0.7) translateZ(0.1px)` } },
      c(SierpinskiTriangle)({ key: 'top', x: 0, y: 0, s: initSize, ts: targetSize, sdr: downRate / 1000 }, seconds)))
}

const start = new Date().getTime()
const oob = document.createElement('div')
const exp = document.createElement('div')
const root = ReactDOM.unstable_createRoot( exp )

function once(fn){
  let called = false
  return () => called ? (() => {})() :  (called=true, fn())  
}

function showhide(a, b){
  a.style.display = 'block'
  b.style.display = 'none'
}
function update (checked=false) {
  if ( checked ) {
    showhide(exp, oob)
    root.render(
      c(React.StrictMode)({}, c(Demo)({ elapsed: new Date().getTime() - start})),
    )
  } else {
    showhide(oob, exp)
    ReactDOM.render(
      c(React.StrictMode)({}, c(Demo)({ elapsed: new Date().getTime() - start})),
      document.getElementById('container')
    )
  }
  requestAnimationFrame(update)
}

document.getElementById('container').appendChild(oob)
document.getElementById('container').appendChild(exp)
requestAnimationFrame(update)
