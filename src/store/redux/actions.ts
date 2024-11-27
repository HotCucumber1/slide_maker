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

type ADD_ELLIPSE = {
    type: "ADD_ELLIPSE",
    payload: AddFigureProps,
}

type ADD_IMAGE = {
    type: "ADD_IMAGE",
    payload: AddImageProps,
}

type ADD_LABEL = {
    type: "ADD_LABEL",
    payload: AddFigureProps,
}

type ADD_SLIDE = {
    type: "ADD_SLIDE",
}

type ADD_TEXT = {
    type: "ADD_TEXT",
    payload: AddTextProps,
}

type ADD_TRIANGLE = {
    type: "ADD_TRIANGLE",
    payload: AddFigureProps,
}

type DELETE_SLIDE = {
    type: "DELETE_SLIDE",
}

type DELETE_SLIDE_OBJECT = {
    type: "DELETE_SLIDE_OBJECT",
}

type SET_FIGURE_COLOR = {
    type: "SET_FIGURE_COLOR",
    payload: Color,
}

type SET_FONT_FAMILY = {
    type: "SET_FONT_FAMILY",
    payload: string,
}

type SET_FONT_SIZE= {
    type: "SET_FONT_SIZE",
    payload: number,
}

type SET_FONT_STYLE= {
    type: "SET_FONT_STYLE",
    payload: FontStyle,
}

type SET_OBJECT_POSITION = {
    type: "SET_OBJECT_POSITION",
    payload: Point,
}

type SET_OBJECT_SELECTION = {
    type: "SET_OBJECT_SELECTION",
    payload: SelectedObjects,
}

type SET_OBJECT_SIZE = {
    type: "SET_OBJECT_SIZE",
    payload: Size,
}

type SET_PRESENTATION_BACKGROUND = {
    type: "SET_PRESENTATION_BACKGROUND",
    payload: Color|Image|Gradient,
}

type SET_PRESENTATION_TITLE = {
    type: "SET_PRESENTATION_TITLE",
    payload: string,
}

type SET_SLIDE_BACKGROUND = {
    type: "SET_SLIDE_BACKGROUND",
    payload: Color|Image|Gradient,
}

type SET_SLIDE_POSITION = {
    type: "SET_SLIDE_BACKGROUND",
    payload: number,
}

type SET_SLIDE_SELECTION = {
    type: "SET_SLIDE_SELECTION",
    payload: SelectedSlides,
}

type SET_TEXT = {
    type: "SET_TEXT",
    payload: string,
}

type ActionType =
    ADD_ELLIPSE
    |ADD_IMAGE
    |ADD_LABEL
    |ADD_TEXT
    |ADD_TRIANGLE
    |ADD_SLIDE
    |SET_TEXT
    |SET_SLIDE_POSITION
    |SET_SLIDE_BACKGROUND
    |SET_SLIDE_SELECTION
    |SET_PRESENTATION_TITLE
    |SET_PRESENTATION_BACKGROUND
    |SET_OBJECT_SIZE
    |SET_OBJECT_POSITION
    |SET_OBJECT_SELECTION
    |SET_FONT_STYLE
    |SET_FONT_SIZE
    |SET_FONT_FAMILY
    |SET_FIGURE_COLOR
    |DELETE_SLIDE
    |DELETE_SLIDE_OBJECT

export type {
    ActionType,
}