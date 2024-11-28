import {
    Color,
    FontStyle,
    Gradient,
    Image,
    Point,
    SelectedObjects,
    SelectedSlides,
    Size,
} from "../objects.ts"
import {AddImageProps} from "../actions/addImage.ts"
import {AddFigureProps} from "../actions/addFigureProps.ts"
import {AddTextProps} from "../actions/addText.ts"
import {Editor} from "../editor.ts"

enum ActionType {
    ADD_ELLIPSE = "ADD_ELLIPSE",
    ADD_IMAGE = "ADD_IMAGE",
    ADD_LABEL = "ADD_LABEL",
    ADD_SLIDE = "ADD_SLIDE",
    ADD_TEXT = "ADD_TEXT",
    ADD_TRIANGLE = "ADD_TRIANGLE",
    DELETE_SLIDE = "DELETE_SLIDE",
    DELETE_SLIDE_OBJECT = "DELETE_SLIDE_OBJECT",
    SET_FIGURE_COLOR = "SET_FIGURE_COLOR",
    SET_FONT_FAMILY = "SET_FONT_FAMILY",
    SET_FONT_SIZE = "SET_FONT_SIZE",
    SET_FONT_STYLE = "SET_FONT_STYLE",
    SET_OBJECT_POSITION = "SET_OBJECT_POSITION",
    SET_OBJECT_SIZE = "SET_OBJECT_SIZE",
    SET_OBJECT_SELECTION = "SET_OBJECT_SELECTION",
    SET_PRESENTATION_BACKGROUND = "SET_PRESENTATION_BACKGROUND",
    SET_PRESENTATION_TITLE = "SET_PRESENTATION_TITLE",
    SET_SLIDE_BACKGROUND = "SET_SLIDE_BACKGROUND",
    SET_SLIDE_SELECTION = "SET_SLIDE_SELECTION",
    SET_SLIDE_POSITION = "SET_SLIDE_POSITION",
    SET_TEXT = "SET_TEXT",
    SET_EDITOR = "SET_EDITOR",
}

type AddEllipseAction = {
    type: ActionType.ADD_ELLIPSE,
    payload?: AddFigureProps,
}

type AddImageAction = {
    type: ActionType.ADD_IMAGE,
    payload: AddImageProps,
}

type AddLabelAction = {
    type: ActionType.ADD_LABEL,
    payload?: AddFigureProps,
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type AddTextAction = {
    type: ActionType.ADD_TEXT,
    payload: AddTextProps,
}

type AddTriangleAction = {
    type: ActionType.ADD_TRIANGLE,
    payload?: AddFigureProps,
}

type DeleteSlideAction = {
    type: ActionType.DELETE_SLIDE,
}

type DeleteSlideObjectAction = {
    type: ActionType.DELETE_SLIDE_OBJECT,
}

type SetFigureColorAction = {
    type: ActionType.SET_FIGURE_COLOR,
    payload: Color,
}

type SetFontFamilyAction = {
    type: ActionType.SET_FONT_FAMILY,
    payload: string,
}

type SetFontSizeAction = {
    type: ActionType.SET_FONT_SIZE,
    payload: number,
}

type SetFontStyleAction = {
    type: ActionType.SET_FONT_STYLE,
    payload: FontStyle,
}

type SetObjectPositionAction = {
    type: ActionType.SET_OBJECT_POSITION,
    payload: Point,
}

type SetObjectSelectionAction = {
    type: ActionType.SET_OBJECT_SELECTION,
    payload: SelectedObjects,
}

type SetObjectSizeAction = {
    type: ActionType.SET_OBJECT_SIZE,
    payload: Size,
}

type SetPresentationBackgroundAction = {
    type: ActionType.SET_PRESENTATION_BACKGROUND,
    payload: Color|Image|Gradient,
}

type SetPresentationTitleAction = {
    type: ActionType.SET_PRESENTATION_TITLE,
    payload: string,
}

type SetSlideBackgroundAction = {
    type: ActionType.SET_SLIDE_BACKGROUND,
    payload: Color|Image|Gradient,
}

type SetSlidePositionAction = {
    type: ActionType.SET_SLIDE_POSITION,
    payload: number,
}

type SetSlideSelectionAction = {
    type: ActionType.SET_SLIDE_SELECTION,
    payload: SelectedSlides,
}

type SetTextAction = {
    type: ActionType.SET_TEXT,
    payload: string,
}

type SetEditor = {
    type: ActionType.SET_EDITOR,
    payload: Editor
}

type EditorAction =
    AddEllipseAction
    |AddImageAction
    |AddLabelAction
    |AddTextAction
    |AddTriangleAction
    |AddSlideAction
    |SetTextAction
    |SetSlidePositionAction
    |SetSlideBackgroundAction
    |SetSlideSelectionAction
    |SetPresentationTitleAction
    |SetPresentationBackgroundAction
    |SetObjectSizeAction
    |SetObjectPositionAction
    |SetObjectSelectionAction
    |SetFontStyleAction
    |SetFontSizeAction
    |SetFontFamilyAction
    |SetFigureColorAction
    |SetEditor
    |DeleteSlideAction
    |DeleteSlideObjectAction

export {
    ActionType,
    type EditorAction,
}