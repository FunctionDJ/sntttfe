import { useState } from "react"

export const useLocalStorage = (key, initialValue) => {
  const [val, setInternal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("get error", error)
      return initialValue
    }
  })

  const setExternal = value => {
    try {
      setInternal(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("set error", error)
    }
  }

  const reset = () => setExternal(initialValue)

  return [val, setExternal, reset]
}

export const useConfirm = (action, normalText) => {
  const [wants, setWants] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleClick = () => {
    if (wants) {
      action()
      setDisabled(true)
    }

    setWants(true)

    setTimeout(() => {
      setWants(false)
      setDisabled(false)
    }, 2000)
  }

  const text = disabled ?
    "Recharging..." :
    (wants ? "Are you sure?" : normalText)

  return [handleClick, text, disabled]
}

export const useItems = () => (
  useLocalStorage("items", [
    "Example Topic #1",
    "Example Topic #2",
    "Example Topic #3"
  ])
)