import {Editor} from "./editor.ts";
import {SelectedObjects} from "./objects.ts";

function setObjectSelection(editor: Editor, newSelection: SelectedObjects): Editor
{
    return {
        ...editor,
        selectedObjects: newSelection,
    }
}

export {
    setObjectSelection,
}