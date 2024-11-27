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
}

type ADD_ELLIPSE_ACTION = {
    type: "ADD_ELLIPSE",
    payload: AddFigureProps,
}

type ADD_IMAGE_ACTION = {
    type: "ADD_IMAGE",
    payload: AddImageProps,
}

type ADD_LABEL_ACTION = {
    type: "ADD_LABEL",
    payload: AddFigureProps,
}

type ADD_SLIDE_ACTION = {
    type: "ADD_SLIDE",
}

type ADD_TEXT_ACTION = {
    type: "ADD_TEXT",
    payload: AddTextProps,
}

type ADD_TRIANGLE_ACTION = {
    type: "ADD_TRIANGLE",
    payload: AddFigureProps,
}

type DELETE_SLIDE_ACTION = {
    type: "DELETE_SLIDE",
}

type DELETE_SLIDE_OBJECT_ACTION = {
    type: "DELETE_SLIDE_OBJECT",
}

type SET_FIGURE_COLOR_ACTION = {
    type: "SET_FIGURE_COLOR",
    payload: Color,
}

type SET_FONT_FAMILY_ACTION = {
    type: "SET_FONT_FAMILY",
    payload: string,
}

type SET_FONT_SIZE_ACTION = {
    type: "SET_FONT_SIZE",
    payload: number,
}

type SET_FONT_STYLE_ACTION = {
    type: "SET_FONT_STYLE",
    payload: FontStyle,
}

type SET_OBJECT_POSITION_ACTION = {
    type: "SET_OBJECT_POSITION",
    payload: Point,
}

type SET_OBJECT_SELECTION_ACTION = {
    type: "SET_OBJECT_SELECTION",
    payload: SelectedObjects,
}

type SET_OBJECT_SIZE_ACTION = {
    type: "SET_OBJECT_SIZE",
    payload: Size,
}

type SET_PRESENTATION_BACKGROUND_ACTION = {
    type: "SET_PRESENTATION_BACKGROUND",
    payload: Color|Image|Gradient,
}

type SET_PRESENTATION_TITLE_ACTION = {
    type: "SET_PRESENTATION_TITLE",
    payload: string,
}

type SET_SLIDE_BACKGROUND_ACTION = {
    type: "SET_SLIDE_BACKGROUND",
    payload: Color|Image|Gradient,
}

type SET_SLIDE_POSITION_ACTION = {
    type: "SET_SLIDE_POSITION",
    payload: number,
}

type SET_SLIDE_SELECTION_ACTION = {
    type: "SET_SLIDE_SELECTION",
    payload: SelectedSlides,
}

type SET_TEXT_ACTION = {
    type: "SET_TEXT",
    payload: string,
}

type Action =
    ADD_ELLIPSE_ACTION
    |ADD_IMAGE_ACTION
    |ADD_LABEL_ACTION
    |ADD_TEXT_ACTION
    |ADD_TRIANGLE_ACTION
    |ADD_SLIDE_ACTION
    |SET_TEXT_ACTION
    |SET_SLIDE_POSITION_ACTION
    |SET_SLIDE_BACKGROUND_ACTION
    |SET_SLIDE_SELECTION_ACTION
    |SET_PRESENTATION_TITLE_ACTION
    |SET_PRESENTATION_BACKGROUND_ACTION
    |SET_OBJECT_SIZE_ACTION
    |SET_OBJECT_POSITION_ACTION
    |SET_OBJECT_SELECTION_ACTION
    |SET_FONT_STYLE_ACTION
    |SET_FONT_SIZE_ACTION
    |SET_FONT_FAMILY_ACTION
    |SET_FIGURE_COLOR_ACTION
    |DELETE_SLIDE_ACTION
    |DELETE_SLIDE_OBJECT_ACTION

export type {
    ADD_ELLIPSE_ACTION,
    ADD_IMAGE_ACTION,
    ADD_LABEL_ACTION,
    ADD_TEXT_ACTION,
    ADD_TRIANGLE_ACTION,
    ADD_SLIDE_ACTION,
    SET_TEXT_ACTION,
    SET_SLIDE_POSITION_ACTION,
    SET_SLIDE_BACKGROUND_ACTION,
    SET_SLIDE_SELECTION_ACTION,
    SET_PRESENTATION_TITLE_ACTION,
    SET_PRESENTATION_BACKGROUND_ACTION,
    SET_OBJECT_SIZE_ACTION,
    SET_OBJECT_POSITION_ACTION,
    SET_OBJECT_SELECTION_ACTION,
    SET_FONT_STYLE_ACTION,
    SET_FONT_SIZE_ACTION,
    SET_FONT_FAMILY_ACTION,
    SET_FIGURE_COLOR_ACTION,
    DELETE_SLIDE_ACTION,
    DELETE_SLIDE_OBJECT_ACTION,
    ActionType,
    Action
}