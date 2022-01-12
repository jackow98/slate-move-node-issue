import {Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
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

    return (
        <EditableBlockContainer
            {...props.attributes}
            element={props.element}
        >
            <div style={{width: "100%"}}>
                <StyledQuestionContainer
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
                                        Question
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

                            </StyledQuestionContentColumn>
                        </>
                    )}
                </StyledQuestionContainer>
            </div>
        </EditableBlockContainer>
    )
}

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