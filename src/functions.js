export const arrayMove = ([...arr], from, to) => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr
}

export const valueTo = (fn, ...args) => (
  event => fn(event.target.value, ...args)
)