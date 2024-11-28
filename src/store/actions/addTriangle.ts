import {Editor} from "../editor.ts";
import {TriangleFigure} from "../objects.ts";
import {AddFigureProps} from "./addFigureProps.ts";
import {
    defaultPos,
    defaultSize,
    defaultFillStyle,
    defaultStrokeWidth,
    defaultStrokeStyle} from "../default_data/defaultObjectSettings.ts";
import {v4 as uuidv4} from "uuid";

function addTriangle(editor: Editor, props?: AddFigureProps): Editor
{
    const newTriangle: TriangleFigure = {
        id: uuidv4(),
        pos: props?.position === undefined ? defaultPos : props.position,
        size: props?.size === undefined ? defaultSize : props.size,
        fillStyle: props?.fillStyle === undefined ? defaultFillStyle : props.fillStyle,
        strokeWidth: props?.strokeWidth === undefined ? defaultStrokeWidth : props.strokeWidth,
        strokeStyle:  props?.strokeStyle === undefined ? defaultStrokeStyle : props.strokeStyle,
        type: "triangle",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content.push(newTriangle);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selectedObjects: [newTriangle.id]
    };
}

export {
    addTriangle,
}