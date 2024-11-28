import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"
import {ActionType, EditorAction} from "../actions.ts"
import {addEllipse} from "../../actions/addEllipse.ts"
import {addImage} from "../../actions/addImage.ts"
import {addLabel} from "../../actions/addLabel.ts"
import {addTriangle} from "../../actions/addTriangle.ts"
import {setFigureColor} from "../../actions/setFigureColor.ts"

const figureReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.ADD_ELLIPSE:
            return addEllipse(editor, action.payload)
        case ActionType.ADD_IMAGE:
            return addImage(editor, action.payload)
        case ActionType.ADD_LABEL:
            return addLabel(editor, action.payload)
        case ActionType.ADD_TRIANGLE:
            return addTriangle(editor, action.payload)
        case ActionType.SET_FIGURE_COLOR:
            return setFigureColor(editor, action.payload)
        default:
            return editor
    }
}

export {
    figureReducer,
}