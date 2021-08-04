import { useState } from "react"
import { useItems, useLocalStorage } from "../hooks"
import { Options } from "./Options"
import { View } from "./View"
import { arrayMove } from "../functions"

import "../styles/main.scss"

export default function App() {
  const [current, setCurrent] = useLocalStorage("current", null)
  const [items, setItems] = useItems()
  const [editMode, setEditMode] = useState(false)

  const setThisItem = (index, value) => {
    items[index] = value
    setItems([...items])
  }

  const deleteItem = index => {
    items.splice(index, 1)
    setItems([...items])
  }

  const addItem = () => {
    setItems([...items, ""])
  }

  const setCurrentWithToggle = index => (
    setCurrent(index === current ? null : index)
  )

  const moveUpItem = index => {
    const destination = (index === 0 ? items.length : index) - 1
    setItems(arrayMove(items, index, destination))
  }

  const moveDownItem = index => {
    const destination = (index === (items.length - 1) ? 0 : index + 1)
    setItems(arrayMove(items, index, destination))
  }
  
  const resetAll = () => {
    setItems([])
    setCurrent(null)
  }

  return (
    <>
      <div
        className="flex rows"
        style={{
          justifyContent: "space-between",
          alignItems: "start"
        }}
      >
        <View
          editMode={editMode}
          items={items}
          addItem={addItem} deleteItem={deleteItem}
          current={current} setCurrent={setCurrentWithToggle}
          setThisItem={setThisItem}
          moveUpItem={moveUpItem} moveDownItem={moveDownItem}
          resetAll={resetAll}
        />
        {editMode && (
          <div className="grey-bg credits">
            <h4>Streamer News Topic Tool Thingy&#8482; for EposVox</h4>
            <p>{"Made by "}
                <a
                  href="https://twitter.com/functiongermany"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @functiongermany
                </a>
                {" / "}
                <a
                  href="https://github.com/FunctionDJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FunctionDJ (GitHub)
                </a>
            </p>
            <p>Held together by glue and React.js</p>
            <p style={{ color: "rgb(145, 255, 84)"}}>Press PageUp/Down in view to move active topic</p>
            <p style={{ color: "rgb(145, 255, 84)"}}>Flickering when editing styles is normal</p>
          </div>
        )}
      </div>
      <Options
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </>
  )
}
