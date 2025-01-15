import { Editor } from "../editor.ts"
import { TriangleFigure } from "../objects.ts"
import { AddFigureProps } from "./addFigureProps.ts"
import {
    defaultPos,
    defaultSize,
    defaultFillStyle,
    defaultStrokeWidth,
    defaultStrokeStyle
} from "../default_data/defaultObjectSettings.ts"
import { v4 as uuidv4 } from "uuid"

function addTriangle(editor: Editor, props?: AddFigureProps): Editor {
    const newTriangle: TriangleFigure = {
        id: uuidv4(),
        pos: props?.position ?? defaultPos,
        size: props?.size ?? defaultSize,
        fillStyle: props?.fillStyle ?? defaultFillStyle,
        strokeWidth: props?.strokeWidth ?? defaultStrokeWidth,
        strokeStyle: props?.strokeStyle ?? defaultStrokeStyle,
        type: "triangle",
    }

    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    )
    if (currentSlideIndex === -1) {
        return editor;
    }

    const newSlides = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        {
            ...editor.presentation.slides[currentSlideIndex],
            content: [
                ...editor.presentation.slides[currentSlideIndex].content,
                newTriangle,
            ],
        },
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selectedObjects: [newTriangle.id],
    }
}

export {
    addTriangle,
}