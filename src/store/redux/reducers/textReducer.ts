import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {ActionType, EditorAction} from "../actions.ts"
import {setFontFamily} from "../../actions/setFontFamily.ts"
import {setFontSize} from "../../actions/setFontSize.ts"
import {setFontStyle} from "../../actions/setFontStyle.ts"
import {setText} from "../../actions/setText.ts"
import {addText} from "../../actions/addText.ts"

const textReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.ADD_TEXT:
            return addText(editor, action.payload)
        case ActionType.SET_TEXT:
            return setText(editor, action.payload)
        case ActionType.SET_FONT_FAMILY:
            return setFontFamily(editor, action.payload)
        case ActionType.SET_FONT_SIZE:
            return setFontSize(editor, action.payload)
        case ActionType.SET_FONT_STYLE:
            return setFontStyle(editor, action.payload)
        default:
            return editor
    }
}

export {
    textReducer,
}