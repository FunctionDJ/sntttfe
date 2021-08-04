import { HexColorInput, HexColorPicker } from "react-colorful";

export const ColorPicker = ({ color, onChange }) => (
  <>
    <HexColorPicker
      color={color}
      onChange={onChange}
      style={{ width: "auto" }}
    />
    <HexColorInput color={color} onChange={onChange}/>
  </>
)