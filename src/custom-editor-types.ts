import {BaseEditor} from "slate";
import {HistoryEditor} from "slate-history";
import {ReactEditor} from "slate-react";

/*
Custom types for each element defining what properties, children and styling elements can have
 */

export enum BLOCK_TYPES {
    RESOURCE = "resource",
    SECTION = "section",
    PASSAGE = "passage",
    QUESTION_TEXT_ONLY = "question-text-only",
    PARAGRAPH = "paragraph",
}

export type ResourceElement = {
    type: BLOCK_TYPES.RESOURCE;
    id: string;
    title?: string;
    description?: string;
    children: SectionElement[];
};

export type SectionElement = {
    type: BLOCK_TYPES.SECTION;
    id: string;
    title?: string;
    description?: string;
    children: (
        | ParagraphElement
        | QuestionElement
        | PassageElement
        )[];
};
export type PassageElement = {
    type: BLOCK_TYPES.PASSAGE;
    id: string;
    title?: string;
    description?: string;
    children: (
        | ParagraphElement
        )[];
};
export type QuestionElement =
    QuestionTextOnlyElement;

export type QuestionTextOnlyElement = {
    type: BLOCK_TYPES.QUESTION_TEXT_ONLY;
    id: string;
    children: (
        | ParagraphElement
        | PassageElement
        )[];
};

export type ParagraphElement = {
    type: BLOCK_TYPES.PARAGRAPH;
    id: string;
    children: CustomText[];
};

export type CustomElement = (
    | ResourceElement
    | SectionElement
    | PassageElement
    | QuestionElement
    | ParagraphElement
    ) &
    AdditionalFieldsElement;

export type AdditionalFieldsElement = {
    position?: number;
    teacherNotes?: string;
};

type CustomText = { bold?: boolean; text: string };
declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
