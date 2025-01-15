import {Editor} from "../editor.ts"

function setPresentationTitle(editor: Editor, newTitle: string): Editor
{
    if (newTitle === "") {
        newTitle = "Новая презентация"
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

export {
    setPresentationTitle,
}