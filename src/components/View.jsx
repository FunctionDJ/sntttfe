import { useEffect } from "react"
import { useConfirm } from "../hooks"
import { Topic } from "./Topic"

export const View = ({
  items,
  setThisItem,
  current, setCurrent,
  addItem,
  deleteItem,
  editMode,
  moveUpItem,
  moveDownItem,
  resetAll
}) => {
  const [handleReset, text, disabled] = useConfirm(resetAll, "Clear topics")

  useEffect(() => {
    const handler = event => {
      if (editMode) {
        return
      }

      const hasCurrent = current !== null
      const last = items.length - 1

      switch (event.key) {
        case "PageUp": {
          const canMoveUp = hasCurrent && current >= 1
          setCurrent(canMoveUp ? current - 1 : last)
          break;
        }
        case "PageDown": {
          const canMoveDown = hasCurrent && current !== last
          setCurrent(canMoveDown ? current + 1 : 0)
          break;
        }
        default:
      }
    }

    window.addEventListener("keydown", handler)

    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [editMode, items, current, setCurrent])

  return (
    <div className="view flex rows" style={{ flex: 1 }}>
      {items.map((item, i) => (
        <Topic
          key={i}
          topicText={item}
          setTopic={t => setThisItem(i, t)}
          isActive={current === i}
          activateTopic={() => setCurrent(i)}
          deleteTopic={() => deleteItem(i)}
          editMode={editMode}
          moveUp={() => moveUpItem(i)}
          moveDown={() => moveDownItem(i)}
          addTopic={addItem}
        />
      ))}
      {editMode && (
        <>
          <button onClick={addItem}>Add item</button>
          <button
            className="preview"
            style={{
              marginTop: "auto",
              cursor: "not-allowed"
            }}
          >
            Example active topic
          </button>
          <button
            onClick={handleReset}
            disabled={disabled}
          >
            {text}
          </button>
        </>
      )}
    </div>
  )
}