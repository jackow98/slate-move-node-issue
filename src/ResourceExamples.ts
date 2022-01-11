import {Descendant} from "slate";
import {getUniqueId} from "./helpers";
import {BLOCK_TYPES} from "./custom-editor-types";

export const RESOURCE_TEMPLATES: {
    [key: string]: Descendant[];
} = {
    Blank: [
        {
            type: BLOCK_TYPES.RESOURCE,
            id: "resource-".concat(getUniqueId()),
            title: "",
            description: "",
            children: [
                {
                    type: BLOCK_TYPES.SECTION,
                    title: "",
                    description: "",
                    id: "section-".concat(getUniqueId()),
                    children: [
                        {
                            type: BLOCK_TYPES.PARAGRAPH,
                            id: "paragraph-".concat(getUniqueId()),
                            children: [{text: ""}],
                        },
                    ],
                },
            ],
        },
    ],
};