import {Editor} from "../editor.ts";
import {EllipseFigure} from "../objects.ts";
import {AddFigureProps} from "./addFigureProps.ts";
import {
    defaultPos,
    defaultSize,
    defaultFillStyle,
    defaultStrokeStyle,
    defaultStrokeWidth
} from "../default_data/defaultObjectSettings.ts";
import {v4 as uuidv4} from "uuid";

function addEllipse(editor: Editor, props: AddFigureProps): Editor
{

    const newEllipse: EllipseFigure = {
        id: uuidv4(),
        pos: props?.position === undefined ? defaultPos : props.position,
        size: props?.size === undefined ? defaultSize : props.size,
        fillStyle: props?.fillStyle === undefined ? defaultFillStyle : props.fillStyle,
        strokeWidth: props?.strokeWidth === undefined ? defaultStrokeWidth : props.strokeWidth,
        strokeStyle:  props?.strokeStyle === undefined ? defaultStrokeStyle : props.strokeStyle,
        type: "ellipse",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    currentSlide.content.push(newEllipse);
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
    addEllipse,
}