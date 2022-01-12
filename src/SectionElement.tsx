import {Divider} from "@mui/material";
import {styled} from "@mui/material/styles";

import {EditableBlockContainer} from "./EditableBlockContainer";

/**
 * Second top level editable element within editor
 * - Section has title, description, header image and children which are any block other than resource and section
 * @param props
 * @constructor
 */
export const SectionElement = (props: any) => {

    return (
        <EditableBlockContainer
            element={props.element}
            elementType={"section"}
            {...props.attributes}
        >
            <StyledSectionContainer
                style={{border: "2px solid #DBDBDB"}}
            >

                <StyledHeaderBox
                    style={{userSelect: "none"}}
                    contentEditable={false}
                >
                    <StyledTitleAndDescriptionColumn>
                        Section element
                    </StyledTitleAndDescriptionColumn>
                    <Divider style={{marginBottom: "20px"}}/>
                </StyledHeaderBox>

                <StyledSectionChildrenContainer>
                    {props.children}
                </StyledSectionChildrenContainer>
            </StyledSectionContainer>
        </EditableBlockContainer>
    );
};

const StyledSectionContainer = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderRadius: "8px",
    width: "100%",
}));

const StyledHeaderBox = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
}));

const StyledSectionChildrenContainer = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
}));

const StyledTitleAndDescriptionColumn = styled("div")(({theme}) => ({
    display: "flex",
    width: "70%",
    flexDirection: "column",
}));