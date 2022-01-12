import {Box, IconButton,} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {CSSProperties, FC} from "react";
import {CustomElement} from "./custom-editor-types";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface EditableBlockContainerProps {
    element: CustomElement;
    dragHandleProps?: any;
    style?: CSSProperties;
    onEdit?: () => void;
}

/**
 * Container for all blocks (elements) within the editor
 * - Consists of a drag and drop icon to move blocks about
 * - A sub menu for the drag icon for secondary actions
 * - A comment button dispalyed on larger elements to tag block and add pedagogy notes
 * @param children
 * @param style
 * @param dragHandleProps
 * @param element
 * @param props
 * @constructor
 */
export const EditableBlockContainer: FC<EditableBlockContainerProps> = ({
                                                                            children,
                                                                            style,
                                                                            element,
                                                                            dragHandleProps
                                                                        }) => {
    return (
        <StyledBox
            sx={{
                width: "100%",
                alignItems: "center",
            }}
            style={style}
        >
            <IconButton sx={{marginRight: "20px"}}>
                <DragIndicatorIcon/>
            </IconButton>
            <StyledContainer>{children}</StyledContainer>
        </StyledBox>
    );
};

const StyledBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    margin: "auto",
}));

const StyledContainer = styled("div")(({theme}) => ({
    width: "90%",
    flexDirection: "row",
    wordBreak: "break-word",
    cursor: "text",
    display: "inlineFlex",
    alignItems: "center",
    flexWrap: "wrap",
}));
