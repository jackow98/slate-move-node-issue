// Define a React component to render leaves with bold text
import {styled} from "@mui/material/styles";

/**
 * A leaf is part of a block within the editor and is used to control the styling of text inline
 * - Leafs are rendered depending on the marks wrapped around them
 * @param props
 * @constructor
 */
export const Leaf = (props: { children: any; attributes: JSX.IntrinsicAttributes; }) => {
    let children = props.children;
    return <StyledContainer {...props.attributes}>{children}</StyledContainer>;
};

const StyledContainer = styled("span")(({theme}) => ({
    display: "inline",
    cursor: "text",
}));
