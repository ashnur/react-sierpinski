module.exports = (s, x, y) => {
  const px = (s) => `${s}px`
  const stl = {
    width: px(s * 2),
    height: px(s * 2),
    left: px(x),
    top: px(y),
    borderRadius: px(s),
    lineHeight: px(s * 2),
    fontSize: px(s * 2)
  }
  return stl
}
