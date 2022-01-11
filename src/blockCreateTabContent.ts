import {BLOCK_TYPES, CustomElement} from "./custom-editor-types";

export type BlockCreateTabCategory = {
    title: string;
    blocks: BlockCreateTabBlock[];
};

export type BlockCreateTabBlock = {
    title: string;
    description: string;
    blockId: string;
};
export type EmptyBlock = { [id: string]: CustomElement };

/**
 * Objects used for empty blocks
 * - These are used when adding a new block
 */
export const EmptyBlocks: EmptyBlock = {
    section: {
        id: "TEMPORARY_SECTION_ID",
        type: BLOCK_TYPES.SECTION,
        title: "",
        description: "",
        children: [
            {
                type: BLOCK_TYPES.PARAGRAPH,
                id: "TEMPORARY_SECTION_PARAGRAPH_ID",
                children: [{text: ""}],
            },
        ],
    },
    question: {
        id: "TEMPORARY_QUESTION_ID",
        type: BLOCK_TYPES.QUESTION_TEXT_ONLY,
        children: [
            {
                type: BLOCK_TYPES.PARAGRAPH,
                id: "TEMPORARY_QUESTION_PARAGRAPH_ID",
                children: [{text: ""}],
            },
        ],
    },
    passage: {
        id: "TEMPORARY_PASSAGE_ID",
        type: BLOCK_TYPES.PASSAGE,
        title: "",
        description: "",
        children: [
            {
                type: BLOCK_TYPES.PARAGRAPH,
                id: "TEMPORARY_PASSAGE_PARAGRAPH_ID",
                children: [{text: ""}],
            },
        ],
    },
    paragraph: {
        id: "TEMPORARY_PARAGRAPH_ID",
        type: BLOCK_TYPES.PARAGRAPH,
        children: [
            {
                text: "",
            },
        ],
    },
};

export const BlockCreateTabContent: BlockCreateTabCategory[] = [
    {
        title: "",
        blocks: [
            {
                blockId: "question",
                title: "Question",
                description: "Create a question for your worksheet",
            },
            {
                blockId: "passage",
                title: "Passage",
                description: "Add a long article, passage or source ",
            },
        ],
    },
    {
        title: "",
        blocks: [
            {
                blockId: "paragraph",
                title: "Body text",
                description: "A block of text",
            },
        ],
    },
];
