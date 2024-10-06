import { useState } from "react";
import "./slide-bottom.scss";

export default function StructSlideBottom(props) {
  const { children } = props;

  const [open, setOpen] = useState(false);

  return <div className={`structSlideBottom ${open ? "open" : ""}`}>
    <button className="slideButton" onClick={() => setOpen(!open)}>
      {open ? "Fechar" : "Abrir"}
    </button>
    <div className="content">
      {children}
    </div>
  </div>
}