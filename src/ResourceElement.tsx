import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * Top level editable element within editor
 * - Resource has title, description, header image and children which are sections
 * @param props
 * @constructor
 */
export const ResourceElement = (props: { attributes: JSX.IntrinsicAttributes; element: any; children: any[]; }) => {

    /**
     * The section breaker is the gap between sections where sections can be dragged to to create new sections
     * - The styling changes conditionally based on what is being dragged over the section breaker
     * @param index
     */
    const renderSectionBreaker = (index: number) => (
        <Droppable droppableId={`resource-breaker-${index}`}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <StyledSectionBreakerContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    contentEditable={false}
                    style={{
                        userSelect: "none",
                    }}
                >
                    <StyledSectionBreakerInner
                        style={{
                            border: snapshot.isDraggingOver
                                ? snapshot.draggingOverWith === "section"
                                    ? "2px solid #D53964"
                                    : 0
                                : 0,
                            backgroundColor: snapshot.isDraggingOver
                                ? snapshot.draggingOverWith === "section"
                                    ? "white"
                                    : "#EB5757"
                                : "inherit",
                            cursor: snapshot.isDraggingOver
                                ? snapshot.draggingOverWith === "section"
                                    ? "default"
                                    : "no-drop"
                                : "default",
                        }}
                    >
                        {/*<TextLink value={"Add section"} onClick={() => null} />*/}
                    </StyledSectionBreakerInner>
                    {/*{provided.placeholder}*/}
                </StyledSectionBreakerContainer>
            )}
        </Droppable>
    );

    return (
        <StyledResourceContainer {...props.attributes}>
            <StyledCenteredColumn>
                <div
                    contentEditable={false}
                    style={{userSelect: "none", marginTop: "20px", width: "100%"}}
                >
                </div>
                <EditableBlockContainer
                    element={props.element}
                    {...props.attributes}
                >
                    <StyledHeaderBox
                        style={{userSelect: "none"}}
                        contentEditable={false}
                    >
                        <StyledHeaderBarHeader>
                            <StyledTitleAndDescriptionColumn>
                                Resource element
                            </StyledTitleAndDescriptionColumn>
                        </StyledHeaderBarHeader>
                    </StyledHeaderBox>
                </EditableBlockContainer>

                <StyledResourceChildrenContainer>
                    {props.children ? (
                        <div>
                            {props.children.map((child: any, index: number) => (
                                <>
                                    {renderSectionBreaker(index)}
                                    {child}
                                </>
                            ))}
                            {renderSectionBreaker(props.children.length)}
                        </div>
                    ) : (
                        <StyledEmptyResourceContainer>
                            <Typography
                                style={{userSelect: "none"}}
                                contentEditable={false}
                                variant={"h4"}
                            >
                                Drag a block to add it to your resource or...
                            </Typography>
                        </StyledEmptyResourceContainer>
                    )}
                </StyledResourceChildrenContainer>
            </StyledCenteredColumn>
        </StyledResourceContainer>
    );
};

const StyledResourceContainer = styled("div")(({theme}) => ({
    display: "flex",
    backgroundColor: "#F8F8F8",
    width: "100%",
    alignItems: "center",
    justifyContent: "flexStart",
    flexDirection: "column",
    paddingBottom: "50vh",
}));

const StyledCenteredColumn = styled("div")(({theme}) => ({
    display: "flex",
    height: "100%",
    width: "70%",
    alignItems: "center",
    justifyContent: "flexStart",
    flexDirection: "column",
}));

const StyledHeaderBox = styled("div")(({theme}) => ({
    display: "flex",
    backgroundColor: "#FFF",
    maxWidth: "95%",
    width: "95%",
    flexDirection: "column",
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
}));

const StyledHeaderBarHeader = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",
}));

const StyledResourceChildrenContainer = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
}));

const StyledEmptyResourceContainer = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}));
const StyledTitleAndDescriptionColumn = styled("div")(({theme}) => ({
    display: "flex",
    width: "70%",
    flexDirection: "column",
}));
const StyledSectionBreakerContainer = styled("div")(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5em",
}));
const StyledSectionBreakerInner = styled("div")(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "0 10px",
    width: "80%",
    height: "80%",
    borderRadius: "10px",
    // backgroundColor: "yellow",
}));
