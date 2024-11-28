import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {ActionType, EditorAction} from "../actions.ts"
import {setObjectPosition} from "../../actions/setObjectPosition.ts"
import {setObjectSize} from "../../actions/setObjectSize.ts"
import {setObjectSelection} from "../../actions/setObjectSelection.ts"
import {deleteSlideObjects} from "../../actions/deleteSlideObject.ts"

const slideObjectReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.SET_OBJECT_POSITION:
            return setObjectPosition(editor, action.payload)
        case ActionType.SET_OBJECT_SIZE:
            return setObjectSize(editor, action.payload)
        case ActionType.DELETE_SLIDE_OBJECT:
            return deleteSlideObjects(editor)
        default:
            return editor
    }
}

export {
    slideObjectReducer,
}