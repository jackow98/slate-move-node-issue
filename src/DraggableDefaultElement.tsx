import React from "react";
import {useSlate} from "slate-react";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * The most basic element used for editing text
 * - This version of a basic element is draggable
 * @param props
 * @constructor
 */
export const DraggableDefaultElement = (props: any) => {
    const editor = useSlate();

    return (
        <div>
            <EditableBlockContainer
                element={props.element}
                {...props.attributes}
            >
                <div
                    style={{
                        cursor: "text",
                    }}
                >
                    {props.children}
                </div>
            </EditableBlockContainer>
        </div>
    );
};
