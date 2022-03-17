import React from "react"
import { useState } from "react";
import './TimelineA.css';

export default function TBox({name}){
    const [dragged, setDragged] = useState(null);
    const addHoverStyle = (element, placement = "after") => {
    if (placement === "before") {
      element.style.borderTop = "1px solid red";
      element.style.borderBottom = "none";
    } else {
      element.style.borderBottom = "1px solid red";
      element.style.borderTop = "none";
    }
  };
  const removeHoverStyle = (element) => {
    element.style.borderBottom = "none";
    element.style.borderTop = "none";
  };
  const preventDefault = (e) => e.preventDefault();
  const onDragStart = (e) => {
    setDragged(e.target);
  };
  const onDragOver = (e) => {
    preventDefault(e);
    const targetBounds = e.target.getBoundingClientRect();
    const dragY = e.clientY;
    const yMidpoint = targetBounds.y + targetBounds.height / 2;
    const insertBefore = dragY < yMidpoint;
    addHoverStyle(e.target, insertBefore ? "before" : "after");
  };
  const onDragLeave = (e) => {
    preventDefault(e);
    removeHoverStyle(e.target);
  };
  const onDrop = (e) => {
    const targetIsList = e.target.className === "list" && "list1";
    const list = targetIsList ? e.target : e.target.parentNode;
    dragged.parentNode.removeChild(dragged);
    if (!targetIsList) {
      removeHoverStyle(e.target);
      // Insert at correct position
      const item = e.target;
      const itemBounds = item.getBoundingClientRect();
      const dragY = e.clientY;
      const yMidpoint = itemBounds.y + itemBounds.height / 2;
      const insertBefore = dragY < yMidpoint;
      if (insertBefore) {
        list.insertBefore(dragged, item);
      } else {
        const nextItem = item.nextSibling;
        if (nextItem) {
          list.insertBefore(dragged, nextItem);
        } else {
          list.appendChild(dragged);
        }
      }
    } else {
      // Add to end of list
      list.appendChild(dragged);
    }
    };

    function DraggableItem(props) {
        const { children, ...otherProps } = props;
        return (
          <div className="item" draggable {...otherProps}>
            {children}
          </div>
        );
      }

    return(
      <h4>{name}</h4>
    );
}