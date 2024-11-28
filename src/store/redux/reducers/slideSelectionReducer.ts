import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {ActionType, EditorAction} from "../actions.ts"
import {setSlideSelection} from "../../actions/setSlideSelection.ts"

const slideSelectionReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.SET_SLIDE_SELECTION:
            return setSlideSelection(editor, action.payload)
        default:
            return editor
    }
}

export {
    slideSelectionReducer,
}