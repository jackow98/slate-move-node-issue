import {Descendant, Editor} from "slate";
import {FC, useCallback} from "react";
import {ResourceElement} from "./ResourceElement";
import {SectionElement} from "./SectionElement";
import {PassageElement} from "./PassageElement";
import {QuestionElement} from "./QuestionElement";
import {DraggableDefaultElement} from "./DraggableDefaultElement";
import {Leaf} from "./Leaf";
import {Editable, Slate} from "slate-react";
import {CustomEditor} from "./CustomEditor";

interface SlateEditorProps {
    value: Descendant[];
    setValue: (value: Descendant[]) => void;
    editor: Editor;
}

/**
 * This is the container that defines the editor used for a resource
 * - The editor uses slate, comprehensive docs here: https://docs.slatejs.org/
 * - It also uses React beautiful DnD for dragging and dropping https://github.com/atlassian/react-beautiful-dnd
 * @constructor
 */
export const SlateEditor: FC<SlateEditorProps> = ({
                                                      editor,
                                                      value,
                                                      setValue,
                                                  }) => {
    /**
     *   Define a rendering function based on the element passed to `props`
     *   -  `useCallback` here to memoize the function for subsequent renders.
     */
    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case "resource":
                return <ResourceElement {...props} />;
            case "section":
                return <SectionElement {...props} />;
            case "passage":
                return <PassageElement {...props} />;
            case "question-text-only":
                return <QuestionElement {...props} />;
            default:
                return <DraggableDefaultElement {...props} />;
        }
    }, []);

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    const onDragHandle = (event: React.DragEvent<HTMLDivElement>) => {
        // Implement custom event logic...

        console.log(event)

        // No matter the status of the event, treat event as *not* being handled by
        // returning false, Slate will execute its own event handler afterward
        return true;
    };

    // Render the Slate context.
    return (
        <Slate editor={editor} value={value} onChange={setValue}>
            <CustomEditor>
                <Editable
                    style={{width: "100%"}}
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    onDrop={onDragHandle}
                    onDragStart={onDragHandle}
                    onDragEnd={onDragHandle}
                    onDragCapture={onDragHandle}
                    onDragEndCapture={onDragHandle}
                    onDragEnter={onDragHandle}
                    onDragEnterCapture={onDragHandle}
                    onDragExit={onDragHandle}
                    onDrag={onDragHandle}
                    onDragExitCapture={onDragHandle}
                    onDragLeave={onDragHandle}
                    onDragLeaveCapture={onDragHandle}
                    onDragOver={onDragHandle}
                    onDragOverCapture={onDragHandle}
                    onDragStartCapture={onDragHandle}
                />
            </CustomEditor>
        </Slate>
    );
};
