import {ActionType, EditorAction} from "../actions.ts"
import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {setObjectSelection} from "../../actions/setObjectSelection.ts"

const objectSelectionReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.SET_OBJECT_SELECTION:
            return setObjectSelection(editor, action.payload)
        default:
            return editor
    }
}

export {
    objectSelectionReducer
}