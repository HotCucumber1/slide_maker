import {Color, LabelFigure} from "./objects.ts";
import {AddFigureProps} from "./addFigureProps.ts";
import {Editor} from "./editor.ts";
import {v4 as uuidv4} from "uuid";


function addLabel(editor: Editor, props: AddFigureProps): Editor
{
    const baseFillStyle: Color = {
        value: "gray",
        type: "color",
    };
    const baseStrokeWidth = 1;
    const baseStrokeStyle: Color = {
        value: "black",
        type: "color",
    };
    const figureObject: LabelFigure = {
        id: uuidv4(),
        pos: props.position,
        size: props.size,
        fillStyle: typeof props.fillStyle === "undefined" ? baseFillStyle : props.fillStyle,
        strokeWidth: typeof props.strokeWidth === "undefined" ? baseStrokeWidth : props.strokeWidth,
        strokeStyle:  typeof props.strokeStyle === "undefined" ? baseStrokeStyle : props.strokeStyle,
        type: "label",
    };

    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    currentSlide.content.push(figureObject);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, currentSlide]
        }
    };
}

export {
    addLabel,
}