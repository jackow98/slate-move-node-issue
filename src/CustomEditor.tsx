import {styled} from "@mui/material/styles";
import {FC} from "react";

/**
 * Styled wrapper for Slate Editor
 * @param props
 * @constructor
 */
export const CustomEditor: FC = (props) => {
    return <CustomEditorContainer>{props.children}</CustomEditorContainer>;
};

const CustomEditorContainer = styled("div")(({theme}) => ({
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flexStart",
    flexDirection: "column",
    marginRight: "5px",
    overflow: "scroll",
    scrollBehavior: "smooth",
}));
