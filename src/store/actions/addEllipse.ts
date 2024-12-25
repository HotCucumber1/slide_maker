// import {Editor} from "../editor.ts";
// import {EllipseFigure} from "../objects.ts";
// import {AddFigureProps} from "./addFigureProps.ts";
// import {
//     defaultPos,
//     defaultSize,
//     defaultFillStyle,
//     defaultStrokeStyle,
//     defaultStrokeWidth
// } from "../default_data/defaultObjectSettings.ts";
// import {v4 as uuidv4} from "uuid";
//
// function addEllipse(editor: Editor, props?: AddFigureProps): Editor {
//     const newEllipse: EllipseFigure = {
//         id: uuidv4(),
//         pos: props?.position ?? defaultPos,
//         size: props?.size ?? defaultSize,
//         fillStyle: props?.fillStyle ?? defaultFillStyle,
//         strokeWidth: props?.strokeWidth ?? defaultStrokeWidth,
//         strokeStyle: props?.strokeStyle ?? defaultStrokeStyle,
//         type: "ellipse",
//     };
//
//     const currentSlideIndex = editor.presentation.slides.findIndex(
//         slide => slide.id === editor.selectedSlides[0]
//     );
//
//     if (currentSlideIndex === -1) {
//         return editor;
//     }
//
//     const updatedSlide = {
//         ...editor.presentation.slides[currentSlideIndex],
//         content: [...editor.presentation.slides[currentSlideIndex].content, newEllipse],
//     };
//     const newSlides = editor.presentation.slides.slice();
//     newSlides[currentSlideIndex] = updatedSlide;
//
//     return {
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: newSlides,
//         },
//         selectedObjects: [newEllipse.id],
//     };
// }
//
// export {
//     addEllipse,
// }

import { Editor } from "../editor.ts";
import { EllipseFigure } from "../objects.ts";
import { AddFigureProps } from "./addFigureProps.ts";
import {
    defaultPos,
    defaultSize,
    defaultFillStyle,
    defaultStrokeStyle,
    defaultStrokeWidth
} from "../default_data/defaultObjectSettings.ts";
import { v4 as uuidv4 } from "uuid";

function addEllipse(editor: Editor, props?: AddFigureProps): Editor {
    const newEllipse: EllipseFigure = {
        id: uuidv4(),
        pos: props?.position ?? defaultPos,
        size: props?.size ?? defaultSize,
        fillStyle: props?.fillStyle ?? defaultFillStyle,
        strokeWidth: props?.strokeWidth ?? defaultStrokeWidth,
        strokeStyle: props?.strokeStyle ?? defaultStrokeStyle,
        type: "ellipse",
    };

    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (currentSlideIndex === -1) {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === currentSlideIndex) {
            return {
                ...slide,
                content: [...slide.content, newEllipse],
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selectedObjects: [newEllipse.id],
    };
}

export {
    addEllipse,
};