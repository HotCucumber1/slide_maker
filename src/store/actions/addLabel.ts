import { LabelFigure } from "../objects.ts";
import { AddFigureProps } from "./addFigureProps.ts";
import { Editor } from "../editor.ts";
import {
    defaultPos,
    defaultSize,
    defaultStrokeWidth,
    defaultFillStyle,
    defaultStrokeStyle
} from "../default_data/defaultObjectSettings.ts";
import { v4 as uuidv4 } from "uuid";

function addLabel(editor: Editor, props?: AddFigureProps): Editor {
    const figureObject: LabelFigure = {
        id: uuidv4(),
        pos: props?.position ?? defaultPos,
        size: props?.size ?? defaultSize,
        fillStyle: props?.fillStyle ?? defaultFillStyle,
        strokeWidth: props?.strokeWidth ?? defaultStrokeWidth,
        strokeStyle: props?.strokeStyle ?? defaultStrokeStyle,
        type: "label",
    };

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selectedSlides[0]) {
            return {
                ...slide,
                content: [...slide.content, figureObject],
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selectedObjects: [figureObject.id],
    };
}

export {
    addLabel,
};