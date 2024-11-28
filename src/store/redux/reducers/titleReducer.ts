import {EditorAction, ActionType} from "../actions.ts"
import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {setPresentationTitle} from "../../actions/setPresentationTitle.ts"

const titleReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.SET_PRESENTATION_TITLE:
            return setPresentationTitle(editor, action.payload)
        default:
            return editor
    }
}

export {
    titleReducer,
}