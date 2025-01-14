import {SlideObject} from "../store/objects.ts"

function isFigure(object: SlideObject) {
    return object.type === "label" ||
        object.type === "triangle" ||
        object.type === "ellipse"
}

export {
    isFigure,
}