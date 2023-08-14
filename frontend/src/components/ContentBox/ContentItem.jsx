import React, { useContext, useEffect, useRef } from "react";
import "./ContentItem.scss";

import { EditContext } from "./ContentRow";

const ContentItem = ({ value, label, children }) => {
  const handler = useContext(EditContext);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [handler.editable]);
  return (
    <div className="contentItem" >
      <div className="wrapper">
        <div className="label">{label}</div>
        <div className="contain">
          <div id={label} onInput={(e) => handler.editHandler(e)} suppressContentEditableWarning={true} contentEditable={handler.editable} ref={inputRef} className={handler.editable ? `value edit ${handler.error ? "error" : ""}` : "value"}>
            {value}
          </div>
          {handler.error && <span className="errorM">Phone number already on record</span>}
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
