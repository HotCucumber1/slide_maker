import {Editor} from "../editor.ts"
import {defaultEditor} from "../default_data/defaultEditor.ts"
import {ActionType, EditorAction} from "./actions.ts"
import {addEllipse} from "../actions/addEllipse.ts"
import {addImage} from "../actions/addImage.ts"
import {addLabel} from "../actions/addLabel.ts"
import {addTriangle} from "../actions/addTriangle.ts"
import {setFigureColor} from "../actions/setFigureColor.ts"
import {setObjectPosition} from "../actions/setObjectPosition.ts"
import {setObjectSize} from "../actions/setObjectSize.ts"
import {deleteSlideObjects} from "../actions/deleteSlideObject.ts"
import {setObjectSelection} from "../actions/setObjectSelection.ts"
import {setSlideSelection} from "../actions/setSlideSelection.ts"
import {addSlide} from "../actions/addSlide.ts"
import {deleteSlides} from "../actions/deleteSlide.ts"
import {setSlidePosition} from "../actions/setSlidePosition.ts"
import {setSlideBackground} from "../actions/setSlideBackground.ts"
import {addText} from "../actions/addText.ts"
import {setText} from "../actions/setText.ts"
import {setFontFamily} from "../actions/setFontFamily.ts"
import {setFontSize} from "../actions/setFontSize.ts"
import {setFontStyle} from "../actions/setFontStyle.ts"
import {setPresentationTitle} from "../actions/setPresentationTitle.ts"
import {storeImages} from "../actions/storeImage.ts"
import {setFontColor} from "../actions/setFontColor.ts"

const editorReducer = (editor: Editor = defaultEditor, action: EditorAction): Editor => {
    switch (action?.type)
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
        case ActionType.SET_OBJECT_POSITION:
            return setObjectPosition(editor, action.payload)
        case ActionType.SET_OBJECT_SIZE:
            return setObjectSize(editor, action.payload)
        case ActionType.DELETE_SLIDE_OBJECT:
            return deleteSlideObjects(editor)
        case ActionType.SET_OBJECT_SELECTION:
            return setObjectSelection(editor, action.payload)
        case ActionType.SET_SLIDE_SELECTION:
            return setSlideSelection(editor, action.payload)
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.DELETE_SLIDE:
            return deleteSlides(editor)
        case ActionType.SET_SLIDE_POSITION:
            return setSlidePosition(editor, action.payload)
        case ActionType.SET_SLIDE_BACKGROUND:
            return setSlideBackground(editor, action.payload)
        case ActionType.ADD_TEXT:
            return addText(editor, action.payload)
        case ActionType.SET_TEXT:
            return setText(editor, action.payload)
        case ActionType.SET_FONT_FAMILY:
            return setFontFamily(editor, action.payload)
        case ActionType.SET_FONT_SIZE:
            return setFontSize(editor, action.payload)
        case ActionType.SET_FONT_COLOR:
            return setFontColor(editor, action.payload)
        case ActionType.SET_FONT_STYLE:
            return setFontStyle(editor, action.payload)
        case ActionType.SET_PRESENTATION_TITLE:
            return setPresentationTitle(editor, action.payload)
        case ActionType.SET_EDITOR:
            return action.payload
        // case ActionType.FETCH_IMAGES_REQUEST:
        //     return fetchImages(editor, action.payload)
        case ActionType.FETCH_IMAGES_SUCCESS:
            return storeImages(editor, action.payload)
        default:
            return editor
    }
}

export {
    editorReducer,
}