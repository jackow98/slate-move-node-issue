import {styled} from "@mui/material/styles";
import React, {FC, useEffect, useState} from "react";
import {createEditor, Descendant, Path, Transforms} from "slate";
import {ReactEditor, withReact} from "slate-react";
import {getNestedObjectByKey, getUniqueId} from "./helpers";
import {EmptyBlocks} from "./blockCreateTabContent";
import {SlateEditor} from "./SlateEditor";
import {Sidebar} from "./Sidebar";
import {CustomElement} from "./custom-editor-types";
import {RESOURCE_TEMPLATES} from "./ResourceExamples";
import {Button, Divider, Input, TextField} from "@mui/material";


/**
 * Screen for the resource editor
 * - Consists of a top nav bar, sidebar for adding elements and an editor for creating resources
 * @constructor
 */
export const EditorScreen: FC = () => {

    const [addQuestionPath, setAddQuestionPath] = useState("")
    const [addPassagePath, setAddPassagePath] = useState("")
    const [addParagraphPath, setAddParagraphPath] = useState("")

    const [moveNodePath, setMoveNodePath] = useState("")
    const [moveNodeId, setMoveNodeId] = useState("")

    const [editor] = useState(() =>
        withReact(createEditor())
    );

    const [value, setValue] = useState<Descendant[]>(RESOURCE_TEMPLATES["Blank"]);

    /**
     * Step 1 of saving a block to the resource
     * - Add the block to the Descendant value
     * - This also adds all the children block
     * @param block
     * @param path
     */
    const insertNodeIntoValue = (block: CustomElement, path?: Path) => {
        if (editor) {
            try {
                //Do not need to get the parent ID here as this will be retrieved and inserted on debounce
                Transforms.insertNodes(editor, block, {
                    at: path,
                });
            } catch (e) {
                console.log(e)
            }
        }
    };

    /**
     * Creates a new blank block within the editor
     * - On drag end, this is called to create node from blank template
     * @param nodeToCreateId
     * @param pathToAddTo
     */
    const handleCreateNewTemplateBlockFromDrag = (nodeToCreateId: "question" | "paragraph" | "passage", pathToAddTo: number[]) => {
        console.log(pathToAddTo)
        console.log(editor)
        if (editor && editor?.children) {
            // get the empty structure of the draggable block
            let block: CustomElement = EmptyBlocks[nodeToCreateId];
            const block_with_unique_id = {
                ...block,
                id: block.id.concat(getUniqueId())
            }

            console.log(block_with_unique_id)
            console.log(pathToAddTo)
            insertNodeIntoValue(block_with_unique_id, pathToAddTo);
        }
    }

    /**
     * Attempts to reorder the blocks and update the editor's value
     * - Finds the source path of the node being dragged and deletes it
     * - Then inserts node being dragged at the path of the destination
     * @param result
     */
    const handleMoveBlockWithinResource = (draggableID: string, droppablePath: number[]) => {
        if (editor && editor?.children) {
            try {
                const draggableNode = getNestedObjectByKey(
                    editor.children,
                    draggableID
                );

                const draggablePath = ReactEditor.findPath(
                    //@ts-expect-error
                    editor.children,
                    draggableNode
                );

                Transforms.moveNodes(editor, {at: draggablePath, to: droppablePath})
            } catch (e) {
                console.log("could not move block")
            }
        }
    };

    useEffect(() => {
        console.log(value);
    }, [value]);

    const renderEditor = () =>
        editor && <SlateEditor editor={editor} value={value} setValue={setValue}/>;

    const renderAddUtilButton = (
        label: string,
        valuePath: string,
        onChange: (v: string) => void,
        idForSource:  "question" | "paragraph" | "passage",
        handleFunction: (id: "question" | "paragraph" | "passage", path: number[]) => void
    ) => {
        return(
            <div style={{display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'lightpink',
                marginBottom: '40px'}}>
                {label}
                <TextField
                    value={valuePath}
                    onChange={(event) => onChange(event.target.value)}
                />
                <Button onClick={() => handleFunction(
                    idForSource,
                    valuePath?.split(',').map(e => parseInt(e))||[]
                )}>
                    Go
                </Button>
            </div>
        )
    }

    const renderMoveUtilButton = (
    ) => {
        return(
            <div style={{display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'lightgray',
                marginBottom: '40px'}}>
                Move node: path - ID
                <TextField
                    value={moveNodePath}
                    onChange={(event) => setMoveNodePath(event.target.value)}
                /><TextField
                    value={moveNodeId}
                    onChange={(event) => setMoveNodeId(event.target.value)}
                />
                <Button onClick={() => handleMoveBlockWithinResource(
                    moveNodeId,
                    moveNodePath?.split(',').map(e => parseInt(e))||[]
                )}>
                    Go
                </Button>
            </div>
        )
    }

    return !editor ? <div>Loading editor...</div> : (
        <StyledScreenContainer>
            <StyledEditorScreen>

                <StyledBody>
                    <StyledSidebar style={{width: "40%"}}>
                        {renderAddUtilButton("Add new question block at:",addQuestionPath, setAddQuestionPath, "question", handleCreateNewTemplateBlockFromDrag)}
                        {renderAddUtilButton("Add new passage block at:",addPassagePath, setAddPassagePath, "passage", handleCreateNewTemplateBlockFromDrag)}
                        {renderAddUtilButton("Add new paragraph block at:",addParagraphPath, setAddParagraphPath, "paragraph", handleCreateNewTemplateBlockFromDrag)}

                        <Divider/>
                        {renderMoveUtilButton()}
                                      </StyledSidebar>

                    <StyledEditorContainer>{renderEditor()}</StyledEditorContainer>
                </StyledBody>
            </StyledEditorScreen>
        </StyledScreenContainer>
    )
};

const StyledScreenContainer = styled("div")(({theme}) => ({
    height: "100vh",
    overflow: "hidden",
}));

const StyledEditorScreen = styled("div")(({theme}) => ({
    display: "flex",
    width: "100%",
    overflow: "hidden",
    flexdirection: "row",
    flex: 1,
    height: "100vh",
}));

const StyledEditorContainer = styled("div")(({theme}) => ({
    width: "100%",
}));

const StyledSidebar = styled("div")(({theme}) => ({
    display: "flex",
    height: "100%",
    overflow: "auto",
    flexDirection:"column",
    transition: `width 200ms`,
    marginTop: "10px",
}));

const StyledBody = styled("div")(({theme}) => ({
    display: "flex",
    overflow: "hidden",
    flexDirection: "row",
    flex: 1,
    height: "100vh",
}));
