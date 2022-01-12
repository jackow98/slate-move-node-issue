import {CustomElement} from "./custom-editor-types";
import {v1 as uuidv1} from "uuid";

/**
 * get the parent db id for the block.
 *
 * @param arr root block
 * @param id child block id
 * @returns All parent chain for the block
 */
export function findParent(arr: any, id: any): any {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return [];
            //return null;
        } else if (arr[i].children && arr[i].children.length) {
            const t = findParent(arr[i].children, id);
            if (t !== false) {
                t.push(arr[i].id);
                return t;
            }
        }
    }
    return false;
}

/**
 * Used to get a nested object from a large object
 * - Use case is retreiving a block from the slate editor resource
 * @param theObject
 * @param key
 */
export function getNestedObjectByKey(theObject: any, key: any): any {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getNestedObjectByKey(theObject[i], key);
            if (result) {
                break;
            }
        }
    } else {
        for (var prop in theObject) {
            if (prop === "id") {
                if (theObject[prop] === key) {
                    return theObject;
                }
            }
            if (
                theObject[prop] instanceof Object ||
                theObject[prop] instanceof Array
            ) {
                result = getNestedObjectByKey(theObject[prop], key);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}

/**
 * Used to get the unique id
 * @returns
 */
export function getUniqueId(): string {
    return `TEMPORARY-${uuidv1()}`;
}

/**
 * Used for duplicating a block, returns children with their own IDs
 * - Skips text children as these do not need an ID
 * @param element
 */
export const createNewIdsForChildBlocks = (element: CustomElement) => {
    Object.assign(element, {
        ...element,
        id: getUniqueId(),
    });

    if (element.type === "paragraph") return element;
    for (let i = 0; i < element.children?.length; i++) {
        Object.assign(element.children[i], {
            ...element.children[i],
            id: getUniqueId(),
        });

        if (element.children[i]?.children?.length > 0) {
            //@ts-expect-error
            element.children[i] = createNewIdsForChildBlocks(element.children[i]);
        }
    }
    return element;
};

/**
 * Retrieves a node from a given path within the provided resource
 * @param resource
 * @param index
 * @param includeTextNode
 */
export const getNodeFromPath = (
    resource: CustomElement[],
    index: number[],
    includeTextNode?: boolean
) => {
    let curr: CustomElement | undefined = Array.from(resource)[0];

    const limit = includeTextNode ? index.length : index.length - 1;

    for (let i = 1; i < limit; i++) {
        try {
            //@ts-expect-error
            curr = curr.children[index[i]];
        } catch (e) {
            return undefined;
        }
    }
    return curr;
};