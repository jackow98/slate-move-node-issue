import {Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ReactChild, ReactFragment, ReactPortal} from "react";
import {BlockCreateTabContent} from "./blockCreateTabContent";
import {BlockMenuItem} from "./BlockMenuItem";

/**
 * First of two tabs in the sidebar with all element types available to be dragged and dropped into the editor
 * @constructor
 */
export const BlockCreateTab = () => {
    return (
        <StyledBlockCreateTab

        >
            <Typography sx={{marginBottom: "5px"}} variant={"h2"}>
                Create a block
            </Typography>
            <Typography variant={"subtitle2"}>
                Drag and drop a block from the list below to add it to your resource
            </Typography>

            <Divider style={{margin: "20px 0"}}/>

            {BlockCreateTabContent.map((blockCategory: { title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; blocks: any[]; }) => (
                <StyledBlockCategory>
                    <Typography variant={"h3"}>{blockCategory.title}</Typography>
                    {blockCategory.blocks.map((block, index) => (
                        <BlockMenuItem
                            id={block.blockId}
                            title={block.title}
                            description={block.description}
                            index={index}
                        />
                    ))}
                </StyledBlockCategory>
            ))}
        </StyledBlockCreateTab>

    );
};

const StyledBlockCreateTab = styled("div")(({theme}) => ({
    marginTop: "30px",
    marginRight: "20px",
    marginLeft: "20px",
    paddingBottom: "50vh",
}));
const StyledBlockCategory = styled("div")(({theme}) => ({
    marginTop: "30px",
}));
