import { Editor } from "../editor.ts";
import {
    Color,
    Gradient,
    Slide, SlideObject,
} from "../objects.ts"
import {isFigure} from "../../service/isFigure.ts"

function setFigureColor(editor: Editor, color: Color | Gradient): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );
    if (currentSlideIndex === -1) {
        return editor;
    }
    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent: SlideObject[] = currentSlide.content.map(object => {
        if (isFigure(object) && editor.selectedObjects.includes(object.id)) {
            return {
                ...object,
                fillStyle: color
            }
        }
        return object
    })

    const newSlides: Slide[] = [
        ...editor.presentation.slides.slice(0, currentSlideIndex),
        {
            ...editor.presentation.slides[currentSlideIndex],
            content: updatedContent,
        },
        ...editor.presentation.slides.slice(currentSlideIndex + 1),
    ]

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    }
}


export {
    setFigureColor,
};