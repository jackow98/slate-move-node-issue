import React from "react";

/**
 * The most basic element used for editing text
 * - This version of a basic element is not draggable
 * @param props
 * @constructor
 */
export const NonDraggableDefaultElement = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return <div style={{margin: "auto"}}>{props.children}</div>;
};
