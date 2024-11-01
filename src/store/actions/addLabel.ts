import {LabelFigure} from "./objects.ts";
import {AddFigureProps} from "./addFigureProps.ts";
import {Editor} from "./editor.ts";
import {basePos, baseSize, baseStrokeWidth, baseStrokeStyle, baseFillStyle} from "./testData/testData.ts";
import {v4 as uuidv4} from "uuid";


function addLabel(editor: Editor, props: AddFigureProps): Editor
{

    const figureObject: LabelFigure = {
        id: uuidv4(),
        pos: props?.position === undefined ? basePos : props.position,
        size: props?.size === undefined ? baseSize : props.size,
        fillStyle: props?.fillStyle === undefined ? baseFillStyle : props.fillStyle,
        strokeWidth: props?.strokeWidth === undefined ? baseStrokeWidth : props.strokeWidth,
        strokeStyle:  props?.strokeStyle === undefined ? baseStrokeStyle : props.strokeStyle,
        type: "label",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
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