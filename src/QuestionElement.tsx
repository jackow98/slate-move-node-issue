import {Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {ReactEditor, useSlate} from "slate-react";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * Editable question block
 * - Rendered conditionally depending on question type
 * - At present open text answer and question with sub parts is supported
 * @param props
 * @constructor
 */
export const QuestionElement = (props: any) => {
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
                        <StyledDraggingOval>
                            <Typography variant={"h1"} color={"white"}>
                                {"Question"}
                            </Typography>
                        </StyledDraggingOval>
                    )}
                    <EditableBlockContainer
                        dragHandleProps={draggableProvided.dragHandleProps}
                        {...props.attributes}
                        element={props.element}
                    >
                        <Droppable droppableId={props.element.id}>
                            {(droppableProvided, droppableSnapshot) => (
                                <div style={{width: "100%"}}>
                                    <StyledQuestionContainer
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >
                                        {!isDragging && (
                                            <>
                                                <StyledQuestionContentColumn
                                                    {...props.attributes}
                                                >
                                                    <StyledHeaderRow
                                                        style={{userSelect: "none"}}
                                                        contentEditable={false}
                                                    >
                                                        <Typography
                                                            variant={"h5"}
                                                            style={{userSelect: "none"}}
                                                            contentEditable={false}
                                                        >
                                                            "Question
                                                        </Typography>

                                                    </StyledHeaderRow>
                                                    <div
                                                        contentEditable={false}
                                                        style={{userSelect: "none"}}
                                                    >
                                                        <Divider/>
                                                    </div>

                                                    <div style={{paddingTop: "10px"}}>
                                                        {props.children.filter(
                                                            (child: { props: { children: { props: { element: { type: string; }; }; }; }; }) =>
                                                                child.props.children?.props.element.type !==
                                                                "answer"
                                                        )}
                                                    </div>

                                                    {droppableProvided.placeholder}
                                                </StyledQuestionContentColumn>
                                            </>
                                        )}
                                    </StyledQuestionContainer>
                                </div>
                            )}
                        </Droppable>
                    </EditableBlockContainer>
                </div>
            )}
        </Draggable>
    );
};

const StyledQuestionContainer = styled("div")(({theme}) => ({
    display: "flex",
    margin: "10px",
    width: "100%",
}));
const StyledQuestionContentColumn = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: "0 10px 10px 0",
    border: "2px solid #DBDBDB",
    padding: "10px",
}));
const StyledHeaderRow = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));
const StyledDraggingOval = styled("div")(({theme}) => ({
    position: "absolute",
    filter: "drop-shadow(0px 2px 16px rgba(66, 84, 102, 0.24))",
    backgroundColor: "#D53964",
    width: "250px",
    height: "50px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
