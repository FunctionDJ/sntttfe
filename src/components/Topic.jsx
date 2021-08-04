import { valueTo } from "../functions";

export const Topic = ({
  topicText,
  setTopic,
  isActive,
  activateTopic,
  deleteTopic,
  editMode,
  moveUp,
  moveDown,
  addTopic
}) => (
  <div className={`topic flex columns ${isActive ? "active" : ""}`}>
    {editMode ? (
      <>
        <input
          className="topic-input"
          value={topicText}
          autoFocus
          onChange={valueTo(setTopic)}
          onKeyDown={event => {
            console.log(event.key)

            if (event.key === "Enter") {
              addTopic()
            }
          }}
        />

        <div className="button-group">
          <button onClick={moveUp}>⬆</button>
          <button onClick={moveDown}>⬇</button>
          <button onClick={deleteTopic}>✖</button>
        </div>
      </>
    ) : (
      <button
        onClick={activateTopic}
        className="topic-button"
      >
        {topicText}
      </button>
    )}
  </div>
)