import {EditorAction, ActionType} from "../actions.ts"
import {addSlide} from "../../actions/addSlide.ts"
import {setSlidePosition} from "../../actions/setSlidePosition.ts"
import {setSlideBackground} from "../../actions/setSlideBackground.ts"
import {Editor} from "../../editor.ts"
import {deleteSlides} from "../../actions/deleteSlide.ts"
import {setSlideSelection} from "../../actions/setSlideSelection.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"

const slideReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action.type)
    {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.DELETE_SLIDE:
            return deleteSlides(editor)
        case ActionType.SET_SLIDE_POSITION:
            return setSlidePosition(editor, action.payload)
        case ActionType.SET_SLIDE_BACKGROUND:
            return setSlideBackground(editor, action.payload)
        case ActionType.SET_SLIDE_SELECTION:
            return setSlideSelection(editor, action.payload)
        default:
            return editor
    }
}

export {
    slideReducer,
}