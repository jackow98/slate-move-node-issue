import {Divider} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {ReactEditor, useSlate} from "slate-react";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * Editable passage block for sources, articles etc
 * - Inlcudes a title, description and children
 * @param props
 * @constructor
 */
export const PassageElement = (props: any) => {
    const [isDragging, setIsDragging] = useState(false);

    const editor = useSlate();
    const path = ReactEditor.findPath(editor, props.element);

    return (
        <Draggable
            key={props.element.id}
            draggableId={props.element.id}
            index={path[2]}
        >
            {(draggableProvided, draggableSnapshot) => (
                <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                >
                    {setIsDragging(draggableSnapshot.isDragging)}
                    {isDragging && (
                        <div>
                            DRAGGING
                        </div>
                    )}

                    <EditableBlockContainer
                        element={props.element}
                        dragHandleProps={draggableProvided.dragHandleProps}
                        {...props.attributes}
                        id={props.element.id}
                    >
                        <Droppable droppableId={props.element.id}>
                            {(droppableProvided, droppableSnapshot) => (
                                <div
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef}
                                    style={{width: "100%"}}
                                >
                                    {!isDragging && (
                                        <StyledPassageContainer
                                        >
                                            <StyledHeaderBox
                                                style={{userSelect: "none"}}
                                                contentEditable={false}
                                            >
                                                <StyledHeaderBarHeader>
                                                    <StyledTitleAndDescriptionColumn>
                                                        Passage element
                                                    </StyledTitleAndDescriptionColumn>
                                                </StyledHeaderBarHeader>
                                                <Divider style={{marginBottom: "20px"}}/>
                                            </StyledHeaderBox>
                                            <StyledResourceChildrenContainer>
                                                {props.children}
                                                {droppableProvided.placeholder}
                                            </StyledResourceChildrenContainer>
                                        </StyledPassageContainer>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </EditableBlockContainer>
                </div>
            )}
        </Draggable>
    );
};

const StyledPassageContainer = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    border: "1px solid #DBDBDB",
    backgroundColor: "#FFF",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
    marginRight: "20px",
}));

const StyledHeaderBox = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
}));

const StyledResourceChildrenContainer = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
}));
const StyledTitleAndDescriptionColumn = styled("div")(({theme}) => ({
    display: "flex",
    width: "70%",
    flexDirection: "column",
}));
const StyledHeaderBarHeader = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",
}));