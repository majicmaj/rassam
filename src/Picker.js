import React from "react";
import "./picker.css";
import { CustomPicker } from "react-color";
var { Hue, Saturation } = require("react-color/lib/components/common");

const pointer = () => <div className="pointer" />;
const Picker = (props) => {
  return (
    <div className="float">
      <div className="picker glassy">
        <div className="sat">
          <Saturation {...props} pointer={pointer} />
        </div>
        <div className="row">
          <Hue direction="horizontal" pointer={pointer} {...props} />
        </div>
      </div>
    </div>
  );
};

export default CustomPicker(Picker);
