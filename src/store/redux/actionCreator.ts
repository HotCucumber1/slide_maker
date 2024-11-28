import {
    ActionType,
    ADD_ELLIPSE_ACTION,
    ADD_IMAGE_ACTION,
    ADD_LABEL_ACTION,
    ADD_SLIDE_ACTION,
    ADD_TEXT_ACTION,
    ADD_TRIANGLE_ACTION,
    DELETE_SLIDE_ACTION,
    DELETE_SLIDE_OBJECT_ACTION,
    SET_FIGURE_COLOR_ACTION,
    SET_FONT_FAMILY_ACTION,
    SET_FONT_SIZE_ACTION,
    SET_FONT_STYLE_ACTION,
    SET_OBJECT_POSITION_ACTION,
    SET_OBJECT_SELECTION_ACTION,
    SET_OBJECT_SIZE_ACTION,
    SET_PRESENTATION_BACKGROUND_ACTION,
    SET_PRESENTATION_TITLE_ACTION,
    SET_SLIDE_BACKGROUND_ACTION,
    SET_SLIDE_POSITION_ACTION,
    SET_SLIDE_SELECTION_ACTION,
    SET_TEXT_ACTION,
} from "./actions.ts"
import {AddFigureProps} from "../actions/addFigureProps.ts"
import {AddImageProps} from "../actions/addImage.ts"
import {AddTextProps} from "../actions/addText.ts"
import {Color, FontStyle, Gradient, Image, Point, SelectedObjects, SelectedSlides, Size, Slide} from "../objects.ts"

const addEllipse = (props: AddFigureProps): ADD_ELLIPSE_ACTION => {
    return {
        type: ActionType.ADD_ELLIPSE,
        payload: props
    }
}

const addImage = (props: AddImageProps): ADD_IMAGE_ACTION => {
    return {
        type: ActionType.ADD_IMAGE,
        payload: props
    }
}

const addLabel = (props: AddFigureProps): ADD_LABEL_ACTION => {
    return {
        type: ActionType.ADD_LABEL,
        payload: props
    }
}

const addSlide = (): ADD_SLIDE_ACTION => {
    return {
        type: ActionType.ADD_SLIDE
    }
}

const addText = (props: AddTextProps): ADD_TEXT_ACTION => {
    return {
        type: ActionType.ADD_TEXT,
        payload: props
    }
}

const addTriangle = (props: AddFigureProps): ADD_TRIANGLE_ACTION => {
    return {
        type: ActionType.ADD_TRIANGLE,
        payload: props
    }
}

const deleteSlides = (slideId: string): DELETE_SLIDE_ACTION => {
    return {
        type: ActionType.DELETE_SLIDE,
        payload: slideId
    }
}

const deleteSlideObject = (): DELETE_SLIDE_OBJECT_ACTION => {
    return {
        type: ActionType.DELETE_SLIDE_OBJECT,
    }
}

const setFigureColor = (color: Color): SET_FIGURE_COLOR_ACTION => {
    return {
        type: ActionType.SET_FIGURE_COLOR,
        payload: color,
    }
}

const setFontFamily = (newFontFamily: string): SET_FONT_FAMILY_ACTION => {
    return {
        type: ActionType.SET_FONT_FAMILY,
        payload: newFontFamily,
    }
}

const setFontSize = (newSize: number): SET_FONT_SIZE_ACTION => {
    return {
        type: ActionType.SET_FONT_SIZE,
        payload: newSize,
    }
}

const setFontStyle = (newFontStyles: FontStyle): SET_FONT_STYLE_ACTION => {
    return {
        type: ActionType.SET_FONT_STYLE,
        payload: newFontStyles,
    }
}

const setObjectPosition = (newPosition: Point): SET_OBJECT_POSITION_ACTION => {
    return {
        type: ActionType.SET_OBJECT_POSITION,
        payload: newPosition,
    }
}

const setObjectSelection = (newSelection: SelectedObjects): SET_OBJECT_SELECTION_ACTION => {
    return {
        type: ActionType.SET_OBJECT_SELECTION,
        payload: newSelection,
    }
}

const setObjectSize = (newSize: Size): SET_OBJECT_SIZE_ACTION => {
    return {
        type: ActionType.SET_OBJECT_SIZE,
        payload: newSize,
    }
}

const setPresentationBackground = (newBackground: Color|Image|Gradient): SET_PRESENTATION_BACKGROUND_ACTION => {
    return {
        type: ActionType.SET_PRESENTATION_BACKGROUND,
        payload: newBackground,
    }
}

const setPresentationTitle = (newTitle: string): SET_PRESENTATION_TITLE_ACTION => {
    return {
        type: ActionType.SET_PRESENTATION_TITLE,
        payload: newTitle,
    }
}

const setSlideBackground = (newBackground: Color|Image|Gradient): SET_SLIDE_BACKGROUND_ACTION => {
    return {
        type: ActionType.SET_SLIDE_BACKGROUND,
        payload: newBackground,
    }
}

const setSlidePosition = (newPosition: number): SET_SLIDE_POSITION_ACTION => {
    return {
        type: ActionType.SET_SLIDE_POSITION,
        payload: newPosition,
    }
}

const setSlideSelection = (newSelection: SelectedSlides): SET_SLIDE_SELECTION_ACTION => {
    return {
        type: ActionType.SET_SLIDE_SELECTION,
        payload: newSelection,
    }
}

const setText = (newText: string): SET_TEXT_ACTION => {
    return {
        type: ActionType.SET_TEXT,
        payload: newText,
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
    deleteSlideObject,
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
}