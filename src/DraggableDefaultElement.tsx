import React, {useEffect, useState} from "react";
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {ReactEditor, useSlate} from "slate-react";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * The most basic element used for editing text
 * - This version of a basic element is draggable
 * @param props
 * @constructor
 */
export const DraggableDefaultElement = (props: any) => {
    const editor = useSlate();

    const [path, setPath] = useState([0,0,0])

    const getPath = () => {
        try{
            setPath(ReactEditor.findPath(editor, props.element))
        }catch (e) {
            console.log("ERROR GETTING PATH",e)
        }
    }

    useEffect(() => {
        getPath()
    },[editor, props.element])


    const [isDragging, setIsDragging] = useState(false);

    const renderStaticBlock = (
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot
    ) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
            {setIsDragging(snapshot.isDragging)}

            <EditableBlockContainer
                element={props.element}
                dragHandleProps={provided.dragHandleProps}
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

    const renderDraggingMenuCard = (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
            {setIsDragging(snapshot.isDragging)}
            <div {...provided.dragHandleProps}>
                Dragging
            </div>
        </div>
    );

    return (
        <Draggable
            key={props.element.id}
            draggableId={props.element.id}
            index={path[2]}
        >
            {(provided, snapshot) =>
                isDragging
                    ? renderDraggingMenuCard(provided, snapshot)
                    : renderStaticBlock(provided, snapshot)
            }
        </Draggable>
    );
};
