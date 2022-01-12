import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {IconButton, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FC} from "react";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {jsx} from "@emotion/react";

interface BlockMenuItemProps {
    title: string;
    description: string;
    index: number;
    id: string;
}

/**
 * Individual menu item with the block create side bar with drag drop icon, block icon and description
 * @param title
 * @param description
 * @param index
 * @param icon
 * @param id
 * @constructor
 */
export const BlockMenuItem: FC<BlockMenuItemProps> = ({
                                                          title,
                                                          description,
                                                          index,
                                                          id,
                                                      }) => {

    const renderDraggingMenuCard = (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>
                Dragging
            </div>
        </div>
    );

    return (
        <div>
            <StyledBlockMenuItem style={{display: "flex"}}>
                <IconButton style={{width: "10%"}}>
                    <DragIndicatorIcon color={"primary"}/>
                </IconButton>
                <div style={{width: "75%"}}>
                    <Typography variant={"h6"}>{title}</Typography>
                    <Typography
                        variant={"body2"}
                    >
                        {description}
                    </Typography>
                </div>
            </StyledBlockMenuItem>
        </div>
    );
}

const StyledBlockMenuItem = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: "8px",
    alignItems: "center",
    padding: "5px",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "10px",
    height: "50px",
}));
