const React = require('react')

module.exports = (type) => (props, ...children) => React.createElement(type, props, ...children)
