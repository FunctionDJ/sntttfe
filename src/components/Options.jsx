import { valueTo } from "../functions"
import { Style } from "react-style-tag"
import { useConfirm, useLocalStorage } from "../hooks"
import { ColorPicker } from "./ColorPicker"

export const Options = ({ editMode, setEditMode }) => {
  const [
    topicWidth, setTopicWidth, resetTopicWidth
  ] = useLocalStorage("topic-width", 350);

  const [
    topicGap, setTopicGap, resetTopicGap
  ] = useLocalStorage("topic-gap", 0.5);

  const [
    topicActiveIndent, setTopicActiveIndent, resetTopicActiveIndent
  ] = useLocalStorage("topic-gap", 1);

  const [
    elementsBgColor, setElementsBgColor, resetElementsBgColor
  ] = useLocalStorage("elements-background", "#333")

  const [
    textColor, setTextColor, resetTextColor
  ] = useLocalStorage("text-color", "#fff")
  
  const [
    topicActiveTextColor, setTopicActiveTextColor, resetTopicActiveTextColor
  ] = useLocalStorage("topic-active-text", "#ff1dc4")
  
  const [
    topicActiveBGColor, setTopicActiveBGColor, resetTopicActiveBGColor
  ] = useLocalStorage("topic-active-background", "#555")

  const resetAll = () => {
    resetTopicWidth()
    resetTopicGap()
    resetElementsBgColor()
    resetTextColor()
    resetTopicActiveBGColor()
    resetTopicActiveTextColor()
    resetTopicActiveIndent()
  }

  const [handleReset, text, disabled] = useConfirm(resetAll, "Reset styles")

  return (
    <div className="options flex rows">
      {/* individual style tags, so that only stuff flickers that's being modified */}
      <Style>{`
        * {
          color: ${textColor};
        }
      `}</Style>
      <Style>{`
        .topic.active .topic-button, .preview {
          margin-left: ${topicActiveIndent}rem;
        }
      `}</Style>
      <Style>{`
        .topic.active .topic-button, .preview {
          color: ${topicActiveTextColor};
        }
      `}</Style>
      <Style>{`
        .topic.active .topic-button, .preview {
          background-color: ${topicActiveBGColor};
        }
      `}</Style>
      <Style>{`
        .topic-button, .topic-input {
          width: ${topicWidth}px;
        }
      `}</Style>
      <Style>{`
        .view > *:not(:last-child):not(.preview) {
          margin-bottom: ${topicGap}em !important;
        }
      `}</Style>
      <Style>{`
        button, input {
          background-color: ${elementsBgColor};
        }
      `}</Style>

      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Switch to view" : "Switch to edit"}
      </button>
      {editMode && (
        <div className="controls flex rows">
          <button
            onClick={handleReset}
            disabled={disabled}
            style={{
              color: "#ddd",
              backgroundColor: "#333"
            }}
          >
            {text}
          </button>
          <div>
            <p>Topic width (px)</p>
            <input
              type="number"
              step="5"
              value={topicWidth}
              onChange={valueTo(setTopicWidth)}
            />
          </div>
          <div>
            <p>Topic gap (em)</p>
            <input
              type="number"
              step="0.05"
              min="0"
              value={topicGap}
              onChange={valueTo(setTopicGap)}
            />
          </div>
          <div>
            <p>Topic active indent (em)</p>
            <input
              type="number"
              step="0.05"
              min="0"
              value={topicActiveIndent}
              onChange={valueTo(setTopicActiveIndent)}
            />
          </div>
          <div>
            <p>Elements text color</p>
            <ColorPicker
              color={textColor}
              onChange={setTextColor}
            />
          </div>
          <div>
            <p>Elements BG color</p>
            <ColorPicker
              color={elementsBgColor}
              onChange={setElementsBgColor}
            />
          </div>
          <div>
            <p>Active topic text color</p>
            <ColorPicker
              color={topicActiveTextColor}
              onChange={setTopicActiveTextColor}
            />
          </div>
          <div>
            <p>Active topic BG color</p>
            <ColorPicker
              color={topicActiveBGColor}
              onChange={setTopicActiveBGColor}
            />
          </div>
        </div>
      )}
    </div>
  )
}