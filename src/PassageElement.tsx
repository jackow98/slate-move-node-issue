import {Divider} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import {Droppable} from "react-beautiful-dnd";
import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * Editable passage block for sources, articles etc
 * - Inlcudes a title, description and children
 * @param props
 * @constructor
 */
export const PassageElement = (props: any) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div

        >
            <EditableBlockContainer
                {...props.attributes}
                element={props.element}
            >
                        <div

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
                                    </StyledResourceChildrenContainer>
                                </StyledPassageContainer>
                            )}
                        </div>

            </EditableBlockContainer>
        </div>
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