export function camelCase (str) {
  return str.replace(/[._-](\w|$)/g, (_, ch) => {
    return ch.toUpperCase()
  })
}
