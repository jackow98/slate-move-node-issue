import {styled} from "@mui/material/styles";
import React, {FC} from "react";
import {BlockCreateTab} from "./BlockCreateTab";

/**
 * Sidebar container for resource container
 * - Conists of tab for creating new blocks and another tab for importing blocks
 * @constructor
 */
export const Sidebar: FC = () => {

    return (
        <StyledSidebar>
            <BlockCreateTab/>
        </StyledSidebar>
    );
};

const StyledSidebar = styled("div")(({theme}) => ({
    justifyContent: "center",
    width: "100%",
}));
