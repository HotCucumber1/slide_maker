import {Editor} from "./editor.ts";

function setPresentationTitle(editor: Editor, newTitle: string): Editor
{
    document.title = newTitle
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    };
}

export {
    setPresentationTitle,
}