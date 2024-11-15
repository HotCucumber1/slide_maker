import {LabelFigure} from "../objects.ts";
import {AddFigureProps} from "./addFigureProps.ts";
import {Editor} from "../editor.ts";
import {
    defaultPos,
    defaultSize,
    defaultStrokeWidth,
    defaultFillStyle,
    defaultStrokeStyle
} from "../default_data/defaultObjectSettings.ts";
import {v4 as uuidv4} from "uuid";


function addLabel(editor: Editor, props: AddFigureProps): Editor
{
    const figureObject: LabelFigure = {
        id: uuidv4(),
        pos: props?.position === undefined ? defaultPos : props.position,
        size: props?.size === undefined ? defaultSize : props.size,
        fillStyle: props?.fillStyle === undefined ? defaultFillStyle : props.fillStyle,
        strokeWidth: props?.strokeWidth === undefined ? defaultStrokeWidth : props.strokeWidth,
        strokeStyle:  props?.strokeStyle === undefined ? defaultStrokeStyle : props.strokeStyle,
        type: "label",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content.push(figureObject);
    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

export {
    addLabel,
}