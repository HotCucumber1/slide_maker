import {ActionType, EditorAction} from "./actions.ts"
import {
    Color,
    FontStyle,
    Gradient,
    Image,
    Point,
    SelectedObjects,
    SelectedSlides,
    Size
} from "../objects.ts"
import {AddFigureProps} from "../actions/addFigureProps.ts"
import {AddImageProps} from "../actions/addImage.ts"
import {AddTextProps} from "../actions/addText.ts"
import {Editor} from "../editor.ts"
import {Photo} from "../../api/apiData.ts"


const addEllipse = (props?: AddFigureProps): EditorAction => {
    return {
        type: ActionType.ADD_ELLIPSE,
        payload: props
    }
}

const addImage = (props: AddImageProps): EditorAction => {
    return {
        type: ActionType.ADD_IMAGE,
        payload: props
    }
}

const addLabel = (props?: AddFigureProps): EditorAction => {
    return {
        type: ActionType.ADD_LABEL,
        payload: props
    }
}

const addSlide = (): EditorAction => {
    return {
        type: ActionType.ADD_SLIDE
    }
}

const addText = (props: AddTextProps): EditorAction => {
    return {
        type: ActionType.ADD_TEXT,
        payload: props
    }
}

const addTriangle = (props?: AddFigureProps): EditorAction => {
    return {
        type: ActionType.ADD_TRIANGLE,
        payload: props
    }
}

const deleteSlides = (): EditorAction => {
    return {
        type: ActionType.DELETE_SLIDE,
    }
}

const deleteSlideObjects = (): EditorAction => {
    return {
        type: ActionType.DELETE_SLIDE_OBJECT,
    }
}

const setFigureColor = (color: Color): EditorAction => {
    return {
        type: ActionType.SET_FIGURE_COLOR,
        payload: color,
    }
}

const setFontFamily = (newFontFamily: string): EditorAction => {
    return {
        type: ActionType.SET_FONT_FAMILY,
        payload: newFontFamily,
    }
}

const setFontSize = (newSize: number): EditorAction => {
    return {
        type: ActionType.SET_FONT_SIZE,
        payload: newSize,
    }
}

const setFontStyle = (newFontStyles: FontStyle): EditorAction => {
    return {
        type: ActionType.SET_FONT_STYLE,
        payload: newFontStyles,
    }
}

const setObjectPosition = (newPosition: Point): EditorAction => {
    return {
        type: ActionType.SET_OBJECT_POSITION,
        payload: newPosition,
    }
}

const setObjectSelection = (newSelection: SelectedObjects): EditorAction => {
    return {
        type: ActionType.SET_OBJECT_SELECTION,
        payload: newSelection,
    }
}

const setObjectSize = (newSize: Size): EditorAction => {
    return {
        type: ActionType.SET_OBJECT_SIZE,
        payload: newSize,
    }
}

const setPresentationBackground = (newBackground: Color|Image|Gradient): EditorAction => {
    return {
        type: ActionType.SET_PRESENTATION_BACKGROUND,
        payload: newBackground,
    }
}

const setPresentationTitle = (newTitle: string): EditorAction => {
    return {
        type: ActionType.SET_PRESENTATION_TITLE,
        payload: newTitle,
    }
}

const setSlideBackground = (newBackground: Color|Image|Gradient): EditorAction => {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND,
        payload: newBackground,
    }
}

const setSlidePosition = (newPosition: number): EditorAction => {
    return {
        type: ActionType.SET_SLIDE_POSITION,
        payload: newPosition,
    }
}

const setSlideSelection = (newSelection: SelectedSlides): EditorAction => {
    return {
        type: ActionType.SET_SLIDE_SELECTION,
        payload: newSelection,
    }
}

const setText = (newText: string): EditorAction => {
    return {
        type: ActionType.SET_TEXT,
        payload: newText,
    }
}

const setEditor = (newEditor: Editor): EditorAction => {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor
    }
}

const importImage = (): EditorAction => {
    return {
        type: ActionType.IMPORT_IMAGE
    }
}

const fetchImage = (keyWord: string): EditorAction => {
    return {
        type: ActionType.FETCH_IMAGES_REQUEST,
        payload: keyWord,
    }
}

const fetchImageSuccess = (images: Photo[]): EditorAction => {
    return {
        type: ActionType.FETCH_IMAGES_SUCCESS,
        payload: images,
    }
}


export default {
    addEllipse,
    addImage,
    addLabel,
    addSlide,
    addText,
    addTriangle,
    deleteSlides,
    deleteSlideObjects,
    setFigureColor,
    setFontFamily,
    setFontSize,
    setFontStyle,
    setObjectPosition,
    setObjectSelection,
    setSlideSelection,
    setText,
    setObjectSize,
    setPresentationBackground,
    setPresentationTitle,
    setSlideBackground,
    setSlidePosition,
    setEditor,
    importImage,
    fetchImage,
    fetchImageSuccess,
}