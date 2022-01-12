import {styled} from "@mui/material/styles";
import React, {FC, useEffect, useRef, useState} from "react";
import {
    DragDropContext,
    DropResult,
    ResponderProvided,
} from "react-beautiful-dnd";
import {createEditor, Descendant, Editor, Path, Transforms} from "slate";
import {ReactEditor, withReact} from "slate-react";
import {getNestedObjectByKey, getNodeFromPath, getUniqueId} from "./helpers";
import {EmptyBlocks} from "./blockCreateTabContent";
import {SlateEditor} from "./SlateEditor";
import {Sidebar} from "./Sidebar";
import {BLOCK_TYPES, CustomElement} from "./custom-editor-types";
import {RESOURCE_TEMPLATES} from "./ResourceExamples";
import { Text } from 'slate';


/**
 * Screen for the resource editor
 * - Consists of a top nav bar, sidebar for adding elements and an editor for creating resources
 * @constructor
 */
export const EditorScreen: FC = () => {

    //CREATE EDITOR: OPTION 1
    // Create a Slate editor object that won't change across renders.
    // const editor = useMemo(
    //   () =>
    //     withReact(
    //       withHistory(
    //         withInlines(withCustomNormaliser(createEditor(), toggleToolBar))
    //       )
    //     ),
    //   []
    // );

    //CREATE EDITOR: OPTION 2
    const [editor] = useState(() =>
      withReact(createEditor())
    );

    //CREATE EDITOR: OPTION 3
    // const editorRef = useRef();
    // if (!editorRef.current)
    //     //@ts-expect-error
    //     editorRef.current = withReact(createEditor());
    //
    // const editor: (Editor & ReactEditor) | undefined =
    //     editorRef?.current || undefined;



    const [value, setValue] = useState<Descendant[]>(RESOURCE_TEMPLATES["Blank"]);
    // const debouncedValueChange = useDebounce(value, 1000);


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
     * Function to capture illegal drag moves and issue any warnings to the user
     * @param destinationDroppableId
     * @param draggableId
     */
    const checkDragMoveIsValidOnAdd = (
        destinationDroppableId: string,
        draggableId: string
    ): boolean => {
        //CASE: If user tries to add any block that isn't a section between two sections, display warning
        if (
            destinationDroppableId.startsWith("resource-breaker-") &&
            draggableId !== BLOCK_TYPES.SECTION
        ) {
            console.log(`You can only add sections between sections`)
            return false;
        } //CASE: If user tries to add a section to a block, display warning
        else if (
            !destinationDroppableId.startsWith("resource-breaker-") &&
            draggableId === BLOCK_TYPES.SECTION
        ) {
            console.log("you can't add a section block here")
            return false;
        }
        return true;
    };

    /**
     * Creates a new blank block within the editor
     * - On drag end, this is called to create node from blank template
     * @param result
     */
    const handleCreateNewTemplateBlockFromDrag = (result: DropResult) => {
        if (editor && editor?.children) {
            if (
                !checkDragMoveIsValidOnAdd(
                    result.destination?.droppableId || "",
                    result.draggableId
                )
            )
                return;

            //CASE: If user tries to add section between section, create the section
            if (
                result.destination?.droppableId.startsWith("resource-breaker-") &&
                result.draggableId === BLOCK_TYPES.SECTION
            ) {
                const insertIndex = parseInt(
                    result.destination?.droppableId.split("resource-breaker-")[1]
                );
                let section: CustomElement = EmptyBlocks[BLOCK_TYPES.SECTION];
                const section_with_unique_id = {
                    ...section,
                    id: section.id.concat(getUniqueId()),
                };
                insertNodeIntoValue(section_with_unique_id, [0, insertIndex]);
            } else {
                const droppablePath: number[] = ReactEditor.findPath(
                    editor,
                    getNestedObjectByKey(editor.children, result.destination?.droppableId)
                );

                droppablePath.splice(
                    droppablePath.length,
                    0,
                    result.destination?.index!
                );
                // get the empty structure of the draggable block
                let block: CustomElement = EmptyBlocks[result.draggableId];
                const block_with_unique_id = {
                    ...block,
                    id: block.id.concat(getUniqueId()),
                };

                insertNodeIntoValue(block_with_unique_id, droppablePath);
            }
        }
    };

    /**
     * Attempts to reorder the blocks and update the editor's value
     * - Finds the source path of the node being dragged and deletes it
     * - Then inserts node being dragged at the path of the destination
     * @param result
     */
    const handleMoveBlockWithinResource = (result: any) => {
        if (editor && editor?.children) {
            try {

                const draggableNode = getNestedObjectByKey(
                    editor.children,
                    result.draggableId
                );

                const draggablePath = ReactEditor.findPath(
                    //@ts-expect-error
                    editor.children,
                    draggableNode
                );

                const droppablePath: number[] = ReactEditor.findPath(
                    editor,
                    getNestedObjectByKey(editor.children, result.destination.droppableId)
                );

                // droppablePath.splice(
                //   droppablePath.length,
                //   0,
                //   result.destination?.index!
                // );


                // Transforms.removeNodes(editor, {at: draggablePath})

                const jsonEditor = Array.from(editor.children)
                console.log("REACT EDITOR", jsonEditor)

                const nodeToMove = draggableNode
                console.log("NODE TO MOVE", nodeToMove)

                // try{
                //     const nodeToMoveNoChildren = {...nodeToMove, children:[]}
                //
                //     const path = ReactEditor.findPath(editor, nodeToMoveNoChildren)
                //     console.log("REACT EDITOR ATTEMPT TO GET PATH OF NODE BEING MOVED", path)
                // }catch (e){
                //     console.log(e)
                // }

                let path = ReactEditor.findPath(editor, nodeToMove)

                console.log("REACT DRAGGABLE PATH", draggablePath)
                console.log("REACT DROPPABLE PATH", droppablePath)

                // Transforms.insertNodes(editor, draggableNode,{at: droppablePath})

                //@ts-expect-error
                if(getNodeFromPath(editor.children, droppablePath).type === "resource"){
                    droppablePath.push(0)
                }

                console.log(Text.isText({text: ""}))

                console.log("REACT DROPPABLE PATH", droppablePath)
                Editor.withoutNormalizing(editor, () => Transforms.deselect(editor))
                Editor.withoutNormalizing(editor, () => Transforms.moveNodes(editor, {at: path, to: droppablePath}))
                // Edi Transforms.insertNodes(editor, nodeToMove,{at: droppablePath});
                console.log(editor)
            } catch (e) {
                console.log("could not move block")
            }
        }
    };

    /**
     * Once an element is dropped,
     * i.e. once the dragging is complete, this function calls the corresponding function depending on source of drag
     * @param result
     */
    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (result.destination && result.source) {
            if (result.destination.droppableId === "create-block-sidebar") {
                console.log("CANT DROP HERE");
            } else if (result.source.droppableId === "create-block-sidebar") {
                handleCreateNewTemplateBlockFromDrag(result);
            } else handleMoveBlockWithinResource(result);
        }
    };

    useEffect(() => {
        console.log(value);
    }, [value]);

    const renderEditor = () =>
        editor && <SlateEditor editor={editor} value={value} setValue={setValue}/>;

    return !editor ? <div>Loading editor...</div> : (
        <StyledScreenContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledEditorScreen>
                    <StyledBody>
                        <StyledSidebar style={{width: "40%"}}>
                            <Sidebar/>
                        </StyledSidebar>

                        <StyledEditorContainer>{renderEditor()}</StyledEditorContainer>
                    </StyledBody>
                </StyledEditorScreen>
            </DragDropContext>
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
